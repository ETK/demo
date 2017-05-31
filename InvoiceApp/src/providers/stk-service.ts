import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UtilService } from './util-service';
import { SqlService } from './sql-service';

/*
  库存管理服务，记库存，记明细帐.
  wudefeng
  2017.05.10
*/
@Injectable()
export class StkService {
  constructor(
    public http: Http,
    public sqlHelp: SqlService,
    public tool: UtilService) {
  }


  /**
   * 进出仓记帐服务，更新库存，记明细帐
   * @param goodNo 商品编号
   * @param storeNo 仓库编号
   * @param qty  本次交易数量
   * @param billNo 交易单据编号
   * @param inOut 进出仓标识（I:进仓，O:出仓）
   */
  stkInOut(goodNo: string, storeNo: string, qty: number, billNo: string, inOut: string = 'I'): Promise<any> {
    return this.sqlHelp.getRowsBySql('select * from stk where good_no=? and store_no=?', [goodNo, storeNo]).then(data => {
      var stkObj = {
        good_no: goodNo,
        store_no: storeNo,
        qty: qty
      },
        stkLogObj = {
          good_no: goodNo,
          store_no: storeNo,
          qty: qty,
          in_out_flag: inOut,
          bill_no: billNo,
          creator: this.tool.loginUser,
          create_time: this.tool.getNowFormatDate()
        };
      if (data.length > 0) {
        stkObj = data[0];
        stkObj.qty = inOut == "I" ? stkObj.qty + qty : stkObj.qty - qty;
      }

      /*  在外面进行批量判断
      if (stkObj.qty < 0) {
        return { msg: '库存不足', result: 1 };
      }
      */

      return this.sqlHelp.save('stk', stkObj).then(result => {
        let presql = this.sqlHelp.getSaveSql("stk_in_out_dtl", stkLogObj);
        return new Promise((resolve, reject) => {
          result.tx.executeSql(presql.sql, presql.params,
            (tx, res) => resolve({ tx: tx, res: res }),
            (tx, err) => reject({ tx: tx, err: err }));
        });
      });
    })
  }

  /**
   * 业务单据计帐(同时审核)
   * @param billNo 单据编号 
   * @param billType 单据类型(1001：销售发货【-】，1002：销售退货【+】，1003：采购收货【+】，1004：采购退货【-】，1005：盘点录入单，1006：调拨单)
   */
  stkBiz(billNo: string, billType: string): Promise<any> {

    if (billType == "1006") {
      return this.stkTranfser(billNo);
    } else if (billType == "1005") {
      return this.stkCheck(billNo);
    } else if (billType == "1004") {
      //TODO
    } else if (billType == "1003") {
      return this.stkPORec(billNo);
    } else if (billType == "1002") {
      //TODO
    } else if (billType == "1001") {
      //TODO
    }
    return null;
    /**
       * TODO:因为JS中，操作数据是通过异步进行的，当一次性要进行处理
       * 很复杂的业务逻辑时，事务很难解决
       * 当前业务单据审核记库存帐方法没有启用统一的事务
    */
  }

  /**
   * 调拨单审核&库存处理
   * @param billNo 单据编号 
   */
  private stkTranfser(billNo): Promise<any> {
    let sql = `select a.out_store_no,a.in_store_no,b.good_no,b.qty,ifnull(c.qty,0) as stkQty 
               from bl_transfer a join bl_transfer_dtl b on a.bill_no=b.bill_no 
               left join stk c on a.out_store_no=c.store_no and b.good_no=c.good_no
               where a.bill_no=? `;
    return this.sqlHelp.getRowsBySql(sql, [billNo]).then(rows => {
      //先判断库存是否足够
      let goods = [], lessStk = false;
      for (let row of rows) {
        if (row.stkQty < row.qty) {
          lessStk = true;
          goods.push(row.good_no);
        }
      }
      if (lessStk) {
        return { result: 1, msg: "以下物料库存不足:\n" + goods.join("\n") }
      }

      //记库存帐及进出仓明细帐，先调出，再调入
      for (let obj of rows) {
        this.stkInOut(obj.good_no, obj.out_store_no, obj.qty, billNo, "O");
        this.stkInOut(obj.good_no, obj.in_store_no, obj.qty, billNo, "I");
      }

      //审核单据，更改状态为20
      return this.sqlHelp.auditBill("bl_transfer", billNo);
    }).catch(result => {
      console.error(result.err.message);
    });
  }

  /**
   * 盘点录入单库存记帐
   * @param billNo 单据编号
   */
  private stkCheck(billNo): Promise<any> {
    let sql = `select a.store_no,b.good_no,b.input_qty,b.stk_qty 
               from bl_stk_check a join bl_stk_check_dtl b on a.bill_no=b.bill_no                
               where a.bill_no=? `;
    return this.sqlHelp.getRowsBySql(sql, [billNo]).then(rows => {
      //处理库存，当录入数量>系统数量时为盘盈，否则为盘亏。
      for (let obj of rows) {
        if (obj.stk_qty < obj.input_qty) {
          this.stkInOut(obj.good_no, obj.store_no, obj.input_qty - obj.stk_qty, billNo, "I");
        } else {
          this.stkInOut(obj.good_no, obj.store_no, obj.stk_qty - obj.input_qty, billNo, "O");
        }
      }
      //审核单据，更改状态为20
      return this.sqlHelp.auditBill("bl_stk_check", billNo);
    }).catch(result => {
      console.error(result.err.message);
    });
  }

  /**
   * 采购收货单记帐
   * @param billNo 单号
   */
  stkPORec(billNo): Promise<any> {
    let sql = `select b.*,c.id as poid,c.finish_flag,c.rec_qty,c.order_qty,a.ref_bill_no
              join purchase_rec a join purchase_rec_detail b on b.bill_no=b.bill_no 
              join purchase_order_detail c on a.ref_bill_no=c.bill_no and b.good_no=c.good_no
              where a.bill_no=?`;
    return this.sqlHelp.getRowsBySql(sql, [billNo]).then(rows => {
      let podtl;
      for (let obj of rows) {
        this.stkInOut(obj.good_no, obj.store_no, obj.delivery_qty, billNo, "I");
        //回写采购订单从表状态及已收数量
        podtl = {
          id: obj.podtl,
          rec_qty: obj.delivery_qty + obj.rec_qty,
          finish_flag: obj.delivery_qty + obj.rec_qty >= obj.order_qty ? "1" : "0"
        };
        this.sqlHelp.save("purchase_order_detail", podtl);
      }
      //回写采购订单主表状态
      this.sqlHelp.getRowsBySql("select id from  purchase_order_detail where finish_flag=0").then(rows => {
        let po = rows[0].ref_bill_no;
        let status = rows.length > 0 ? "30" : "50";
        this.sqlHelp.execSql("update purchase_order set bill_status=? where bill_no=?", [status, po]);
      });
      return this.sqlHelp.auditBill("purchase_rec", billNo);
    });
  }
}
