import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import {UtilService} from '../../../providers/util-service';
import { SqlService } from '../../../providers/sql-service';
/*
  Generated class for the PurchaseRecDetail page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-purchase-rec-detail',
  templateUrl: 'purchase-rec-detail.html'
})
export class PurchaseRecDetailPage {

  purchaseRec:any;
  public supplierList:any = [];
  public purchaseOrderList:any = [];
  public details:any = [];
  public allGoods:any = [];
  readonlyStatus :boolean = true;
  constructor(public navCtrl: NavController,public util:UtilService,public navParams: NavParams,public sqlHelp:SqlService,public viewCtrl:ViewController,public alertCtrl: AlertController) {
    if(navParams.get('detail')){
      this.purchaseRec = navParams.get('detail')
      this.getDetails(this.purchaseRec.bill_no);
    }else {
      let date:Date = new Date();
      this.purchaseRec = {bill_status:'10' ,create_time:date.getFullYear()+"-"+((date.getMonth()+1)>9?date.getMonth()+1:0+""+(date.getMonth()+1))+"-"+(date.getDate()>9?date.getDate():0+""+date.getDate())};
    }
    this.readonlyStatus = navParams.get('operation');
    this.getSupplier();
    this.getPurchaseOrder();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad purchaseOrderPage');
  }

  getSupplier(){
    this.sqlHelp.query("supplier", "").then(data => {
      if (data.res.rows.length > 0) {
        this.supplierList = this.util.sqliteToArrqy(data.res.rows);
      }
    });
  }
  getPurchaseOrder(){
    this.sqlHelp.query("purchase_order", "").then(data => {
      if (data.res.rows.length > 0) {
        this.purchaseOrderList = this.util.sqliteToArrqy(data.res.rows);
      }
    });
  }
  getDetails(billNo){
    if(!billNo){return;}
    this.sqlHelp.query("purchase_rec_detail", "bill_no = '"+billNo+"'").then(data => {
      if (data.res.rows.length > 0) {
        this.details = this.util.sqliteToArrqy(data.res.rows);
      }
    });
  }
  save(){
    if (!this.purchaseRec.supplier_no  || !this.purchaseRec.create_time ) {
      this.util.showToast("请把所有信息填完整");
      return;
    }
    if(!this.purchaseRec.bill_no){
      this.sqlHelp.getCodeNo('RC', true).then( no =>{
        this.purchaseRec.bill_no = no;
        this.sqlHelp.save('purchase_rec', this.purchaseRec).then((err)=>{
          for(let de of this.details){
            de.bill_no = this.purchaseRec.bill_no;
            this.sqlHelp.save('purchase_rec_detail', de).catch((err)=>{
              console.info(err);
            })
          }
        })
        this.viewCtrl.dismiss(true);

      })
    }else{
      this.sqlHelp.save('purchase_rec', this.purchaseRec).then((err)=>{
        for(let de of this.details){
          de.bill_no = this.purchaseRec.bill_no;
          this.sqlHelp.save('purchase_rec_detail', de).catch((err)=>{
            console.info(err);
          })
        }

      })
      this.viewCtrl.dismiss(true);
    }

  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  editItem(){
    this.readonlyStatus = false;
  }
  getGoodData() {
    this.sqlHelp.query('good').then((data) => {
      this.allGoods = this.util.sqliteToArrqy(data.res.rows);
    }).catch((err) => {
      console.error(err);
    });
  }

  addGoods(){
    let alert = this.alertCtrl.create();
    alert.setTitle('请选择商品');
    for(let good of this.allGoods){
      alert.addInput({
        type: 'checkbox',
        label: good.good_name,
        value: good.good_no,
        checked: false
      });
    }
    alert.addInput({
      type: 'checkbox',
      label: "商品1",
      value: "good1",
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        var price :number  = 0 ;
        for(let item of data){
          price  += item.sale_price?item.sale_price:0;
          this.details.push({
            bill_no:this.purchaseRec.bill_no,
            good_no:item
          });
        }
        this.purchaseRec.cost = price;
      }
    });
    alert.present();
  }
  selectOption($event){
      this.details = [];
      for(let item of this.purchaseOrderList){
        if(item.bill_no == this.purchaseRec.ref_bill_no){
          this.purchaseRec.supplier_no = item.supplier_no;
          this.getDetailGoods(item.bill_no);
          break;
        }
      }
  }
  getDetailGoods(bill_no:string){
    if(!bill_no){return;}
    this.sqlHelp.query("purchase_order_detail", "bill_no = '"+bill_no+"'").then(data => {
      if (data.res.rows.length > 0) {
        for(let item of this.util.sqliteToArrqy(data.res.rows) ){
          this.details.push({
            good_no:item.good_no,
            price:item.price,
            delivery_qty:2
          });
        }
      }
    });
  }
}
