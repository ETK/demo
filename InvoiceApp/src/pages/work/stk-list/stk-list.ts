import {Component} from '@angular/core';
import {IonicPage,NavController, NavParams, ModalController} from 'ionic-angular';
import {SqlService} from '../../../providers/sql-service';
/*
 Generated class for the StkList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-stk-list',
  templateUrl: 'stk-list.html'
})
export class StkListPage {

  private stkList: any[] = [];
  private searchKey: string = "";
  private inputTime: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public sqlService: SqlService) {
  }

  ionViewDidLoad() {   
    this.getData();
  } 

  getData(isFilter:boolean=false) {   
    let sqlStr = `select a.*,b.good_name,depot_name as store_name 
                  from stk a join good b on a.good_no=b.good_no
                  join depot c on a.store_no=c.depot_no  
                  where 1=1`;
    if (isFilter && this.searchKey.length > 0) {
      let key = this.searchKey.replace(/\'/g,"''");
      sqlStr += " and (a.good_no like '%?%' or b.good_name like '%?%' or c.depot_name like '%?%')".replace(/\?/g, key);
    }
    this.sqlService.getRowsBySql(sqlStr).then(data => {
      this.stkList = [].concat(data);
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
