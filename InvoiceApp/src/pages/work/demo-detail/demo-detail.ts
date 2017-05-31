import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SqlService } from '../../../providers/sql-service';
import { StkService } from '../../../providers/stk-service';


/*
  Generated class for the CustomerDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-demo-detail',
  templateUrl: 'demo-detail.html'
})
export class DemoDetailPage {
 
  private customer: any = {};
  private isNew: boolean = true;

  private stk:any={
    good_no:'NLD0001',
    store_no:'DL01',
    in_out_flag:'I',
    qty:10
  };

  billNo: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public sqlHelp: SqlService,
    public stkService:StkService) {
  }

  ionViewDidLoad() {
    let obj = this.navParams.get('customer');
    if (obj) {
      this.customer = obj;
      this.isNew = false;
    } else {
      this.sqlHelp.getCodeNo("KH", false).then(no => {
        this.customer.customer_no = no
      });
    }
    this.getBillNo();
  }

  /**
   * 保存对象
   */
  save() {
    this.sqlHelp.save("customer",this.customer).catch((err) => {
      console.info(err);
    })
    this.viewCtrl.dismiss(true);
  }

  /**
   * 取单号
   */
  getBillNo() {
    this.sqlHelp.getCodeNo("SO").then(no => {
      this.billNo = no;
    });
  }

  savestk(){
      this.stkService.stkInOut(this.stk.good_no,this.stk.store_no,this.stk.qty,this.billNo,this.stk.in_out_flag).then(result=>{
       console.info("库存操作成功",result);        
    }).catch(err=>{
      console.error("出错了!!!",err);
    });
  }

}
