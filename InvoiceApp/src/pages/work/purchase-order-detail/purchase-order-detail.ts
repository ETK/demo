import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import {UtilService} from '../../../providers/util-service';
import { SqlService } from '../../../providers/sql-service';

/*
  Generated class for the PurchaseOrderDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-purchase-order-detail',
  templateUrl: 'purchase-order-detail.html'
})
export class PurchaseOrderDetailPage {

  purchaseOrder:any;
  public supplierList:any = [];
  public details:any = [];
  public allGoods:any = [];
  readonlyStatus :boolean = true;
  constructor(public navCtrl: NavController,public util:UtilService,public navParams: NavParams,public sqlHelp:SqlService,public viewCtrl:ViewController,public alertCtrl: AlertController) {
    if(navParams.get('detail')){
      this.purchaseOrder = navParams.get('detail')
      this.getDetails(this.purchaseOrder.bill_no);
    }else {
      let date:Date = new Date();
      this.purchaseOrder = {bill_type:'10' ,create_time:date.getFullYear()+"-"+((date.getMonth()+1)>9?date.getMonth()+1:0+""+(date.getMonth()+1))+"-"+(date.getDate()>9?date.getDate():0+""+date.getDate())};
    }
    this.readonlyStatus = navParams.get('operation');
    this.getSupplier();
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
  getDetails(billNo){
    if(!billNo){return;}
    this.sqlHelp.query("purchase_order_detail", "bill_no = '"+billNo+"'").then(data => {
      if (data.res.rows.length > 0) {
        this.details = this.util.sqliteToArrqy(data.res.rows);
      }
    });
  }
  save(){
    if(!this.purchaseOrder.bill_no){
      this.sqlHelp.getCodeNo('CO', true).then( no =>{
        this.purchaseOrder.bill_no = no;
        if (!this.purchaseOrder.bill_no || !this.purchaseOrder.supplier_no  || !this.purchaseOrder.create_time ) {
          this.util.showToast("请把所有信息填完整");
          return;
        }
        this.sqlHelp.save('purchase_order', this.purchaseOrder).then((err)=>{
          for(let de of this.details){
            de.bill_no = this.purchaseOrder.bill_no;
            this.sqlHelp.save('purchase_order_detail', de).catch((err)=>{
              console.info(err);
            })
          }
        })
        this.viewCtrl.dismiss(true);

      })
    }else{
      if (!this.purchaseOrder.bill_no || !this.purchaseOrder.supplier_no  || !this.purchaseOrder.create_time  ) {
        this.util.showToast("请把所有信息填完整");
        return;
      }
      this.sqlHelp.save('purchase_order', this.purchaseOrder).then((err)=>{
        for(let de of this.details){
          de.bill_no = this.purchaseOrder.bill_no;
          this.sqlHelp.save('purchase_order_detail', de).catch((err)=>{
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
            bill_no:this.purchaseOrder.bill_no,
            good_no:item
          });
        }
        this.purchaseOrder.cost = price;
      }
    });
    alert.present();
  }

}
