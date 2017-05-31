import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SqlService } from '../../../providers/sql-service';
import { UtilService } from '../../../providers/util-service';
import { StkService } from '../../../providers/stk-service';

/*
  调拨单.
 wudefeng
 2017-5-11
*/
@IonicPage()
@Component({
  selector: 'page-transfer-list',
  templateUrl: 'transfer-list.html'
})
export class TransferListPage {

  items: any[] = [];
  searchKey: string = "";
  inputTime: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public sqlHelp: SqlService,
    public util: UtilService,
    public stkService:StkService
  ) { }

  ionViewDidLoad() {
    this.getData();
  }

  getData(isFilter: boolean = false) {
    let sql = `select a.*,count(b.id) as itemCount,sum(b.qty*e.cost_price) as cost,
                c.depot_name as out_store_name,d.depot_name as in_store_name 
             from bl_transfer a join bl_transfer_dtl b on a.bill_no=b.bill_no 
             join depot c on a.out_store_no = c.depot_no
             join depot d on a.in_store_no = d.depot_no
             join good e on b.good_no = e.good_no
             where 1=1 `;
    if (isFilter && this.searchKey) {
      sql += " and (a.bill_no like '%?%' or b.good_no like '%?%' or c.depot_name like '%?%' or d.depot_name like '%?%' or e.good_name like '%?%')".replace(/\?/g, this.searchKey);
    }
    sql += "  group by a.bill_no";
    this.sqlHelp.getRowsBySql(sql).then(data => {
      this.items = [].concat(data);
    });
  }

  onSearch($event) {
    this.inputTime = $event.timeStamp;
    setTimeout(() => {
      if ($event.timeStamp == this.inputTime) {
        console.info("search...");
        this.getData(true);
      }
    }, 500);
  }

  addItem(obj: any) {
    this.navCtrl.push('TransferDetailPage', { item: obj, parentPage: this });
  }

  deleteItem(obj: any) {
    this.util.showConfirm("确认删除？", "", () => {
      this.sqlHelp.removeBill("bl_transfer", "bl_transfer_dtl", obj.bill_no).then(data => {
        this.items.splice(this.items.indexOf(obj), 1);
      });
    });
  }
  audit(obj: any) {
    this.util.showConfirm("确认审核？", "", () => {
      this.stkService.stkBiz(obj.bill_no, "1006").then(data => {
        if (data.result == "1") {
          this.util.showAlert(data.msg, "出错了");
          return;
        }
        this.getData();
      });
    });
  }
}
