import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';

import { SqlService } from '../../../providers/sql-service';

/*
  进出仓明细表
  wudefeng
  2017-05-19
*/
@IonicPage()
@Component({
  selector: 'page-stk-log-list',
  templateUrl: 'stk-log-list.html'
})
export class StkLogListPage {

  items: any[] = [];
  searchKey: string = "";
  inputTime: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlHelp: SqlService
  ) { }

  ionViewDidLoad() {
    this.getData();
  }

  getData(isSearch: boolean = false) {
    let sql = `select a.*,b.depot_name as store_name,c.good_name 
               from stk_in_out_dtl a 
               join depot b on a.store_no = b.depot_no
               join good c on a.good_no=c.good_no
               where 1=1 `;

    if (isSearch && this.searchKey) {
      let val = this.searchKey;
      sql += ` and (a.good_no like '%?%' or c.good_name like '%?%' 
               or b.depot_name like '%?%' or a.bill_no like '%?%')`.replace(/\?/gm, val);
    }
    this.sqlHelp.getRowsBySql(sql).then(rows => {
      this.items = [].concat(rows);
    });
  }

  onSearch(event) {
    if (this.searchKey.length < 1) return;
    this.inputTime = event.timeStamp;
    setTimeout(() => {
      if (event.timeStamp == this.inputTime) {
        console.info("search...");
        this.getData(true);
      }
    }, 500);
  }
}
