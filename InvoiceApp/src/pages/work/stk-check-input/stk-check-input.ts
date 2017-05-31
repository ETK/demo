import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams,  ModalController } from 'ionic-angular';
import { SqlService } from '../../../providers/sql-service';
import { UtilService } from '../../../providers/util-service';
import { StkService } from '../../../providers/stk-service';
/*
  盘点录入单
  wudefeng
  2017-05-12
*/
@IonicPage()
@Component({
  selector: 'page-stk-check-input',
  templateUrl: 'stk-check-input.html'
})
export class StkCheckInputPage {

  item: any = {};         //主表对象
  checkList: any[] = [];  //从表对象
  isAdd: boolean = true;  //是否新增 
  parentPage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,   
    public sqlHelp: SqlService,
    public util: UtilService,
    public stk: StkService,
    public modalCtrl: ModalController
  ) { }

  ionViewDidLoad() {
    let obj = this.navParams.get("item"), sql;
    this.parentPage = this.navParams.get("parentPage");
    if (obj) {
      this.item = obj;
      sql = `select a.*,b.good_name,b.img from bl_stk_check_dtl a 
             join good b on a.good_no=b.good_no where bill_no=?`;
      this.sqlHelp.getRowsBySql(sql, [obj.bill_no]).then(data => {
        this.checkList = [].concat(data);       
      });
      this.isAdd = false;
    } else {
      this.sqlHelp.getCodeNo("PD").then(no => {
        this.item.bill_no = no;
      });
      this.item.bill_status = "10";
    }
  }

  inputQty(obj: any) {

    if (!this.isAdd) return;

    let qty = obj.input_qty;
    if (typeof qty == undefined) {
      qty = "";
    }

    this.util.showPrompt('系统数量为:' + obj.stk_qty, '输入数量', [{ name: 'qty', placeholder: '输入实际盘点数量', type: 'number', value: qty }], data => {

      if (data.qty == "") {
        console.dir("盘点数量必须录入");
        return false;
      }     
      obj.input_qty = data.qty;
    });
  } 

  saveCheck() {
    let msg = "";
    if (!this.item.store_no) {
      msg = "请选择仓库";
    }   

    if (this.getInputCount() < 1) {
      msg = "没有盘点项需保存";
    }

    if (msg.length > 0) {
      this.util.showAlert(msg);
      return;
    }
  
    let inputList = [];
    for (let obj of this.checkList) {
      if (obj.hasOwnProperty("input_qty")) {
        inputList.push({
          id: obj.id || null,
          bill_no: this.item.bill_no,
          good_no: obj.good_no,
          cost: obj.cost,
          stk_qty: obj.stk_qty,
          input_qty: obj.input_qty
        });
      }
    }  

    let checkObj = {
      bill_no: this.item.bill_no,
      bill_status: '10',
      store_no: this.item.store_no,
      creator: this.util.loginUser,
      create_time: this.util.getNowFormatDate().substr(0, 10)
    };

    this.util.showConfirm("确认对录入的" + inputList.length + "项进行盘点?", "", () => {
      this.sqlHelp.saveBill("bl_stk_check", checkObj, "bl_stk_check_dtl", inputList).then(result => {
        this.stk.stkBiz(this.item.bill_no, "1005").then(() => {
          this.parentPage && this.parentPage.getData && this.parentPage.getData(true);
          this.navCtrl.pop();
        });       
      }).catch(error => {
        console.error(error.err.message);
      })
    })
  }

  chooseStore() {
    //当已录入了盘点数量，不能更改仓库
    if (this.getInputCount() >0 || this.item.bill_status=="20") { return; }

    let storepage = this.modalCtrl.create('DepotListPage', { isChoose: true });
    storepage.onDidDismiss(store => {
      if (store) {
        this.item.store_no = store.store_no;
        this.item.store_name = store.store_name;
        //加载商品库存
        let sql = `select a.good_no,a.good_name,a.img,a.cost_price as cost,ifnull(b.qty,0) as stk_qty 
                   from good a  join stk b on a.good_no=b.good_no
                   where 1=1 and b.store_no=? union all
                   select a.good_no,a.good_name,a.img,a.cost_price as cost,0 as stk_qty 
                   from good a  where not exists(select 1 from stk b where a.good_no=b.good_no and b.store_no=?)`;
        this.sqlHelp.getRowsBySql(sql,[store.store_no,store.store_no]).then(rows => {
          this.checkList = [].concat(rows);
        });
      }
    });
    storepage.present();
  }

  getInputCount() {
    return this.checkList.filter(item => { return item.hasOwnProperty("input_qty") }).length;
  }

  getTotalCost() {
    let cost = 0;
    for (let item of this.checkList) {
      if (item.hasOwnProperty("input_qty")) {
        cost += (item.input_qty - item.stk_qty) * item.cost
      }
    }
    return cost;
  }
}
