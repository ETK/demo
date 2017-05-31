import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, ModalController } from 'ionic-angular';
import { SqlService } from '../../../providers/sql-service';

/*
   盘点录入单
  wudefeng
  2017-05-12
*/
@IonicPage()
@Component({
  selector: 'page-stk-check',
  templateUrl: 'stk-check.html'
})
export class StkCheckPage {

  items: any[] = [];
  searchKey: string = "";
  inputTime: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public sqlHelp: SqlService
  ) { }

  ionViewDidLoad() {
    this.getData();
  }

  addItem(obj: any) {
    this.navCtrl.push('StkCheckInputPage', { item: obj, parentPage: this });
  }

  getData(isfilter:boolean=false) {
    let sql = `select a.bill_no,store_no, a.create_time,c.depot_name as store_name,a.bill_status,
               sum((b.input_qty-b.stk_qty)*b.cost) as totalCost
             from bl_stk_check a join bl_stk_check_dtl b on a.bill_no=b.bill_no
             join depot c on a.store_no=c.depot_no
             join good d on b.good_no = d.good_no`;             
    if (isfilter && this.searchKey) {
      let val = this.searchKey;
      sql += " and (a.bill_no like '%?%' or c.depot_name like '%?%' or d.good_no like '%?%' or d.good_name like '%?%')".replace(/\?/g, val);
    }
    sql += ' group by a.bill_no';
    this.sqlHelp.getRowsBySql(sql).then(rows => {
      this.items = [].concat(rows);
    }).catch(err => {
      console.error(err.err);
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
}
