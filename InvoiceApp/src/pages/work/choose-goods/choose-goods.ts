import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { SqlService } from "../../../providers/sql-service";
import { UtilService } from "../../../providers/util-service";
/*
  选择商品页面.
  wudefeng
  2017-05-11
*/
@IonicPage()
@Component({
  selector: 'page-choose-goods',
  templateUrl: 'choose-goods.html'
})
export class ChooseGoodsPage {  
  items: any[] = [];  
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sqlHelp: SqlService,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public util: UtilService
  ) { }

  ionViewDidLoad() {
    this.getData();     
  }

  getData() {
    this.sqlHelp.getRowsByTable('good').then((data) => {
      this.items = [].concat(data);    
      let choosed = this.navParams.get("choosed"),item:any;
      if (choosed) {
        for (let obj of choosed) {
          if (obj.qty && obj.good_no) {
            item = this.items.find((i) => { return i.good_no == obj.good_no });
            if (item) {
              item.input_qty = obj.qty;
             }
           }
         }
      }
    });
  }

  addItem() {
    var page = this.modalCtrl.create('GoodsEditPage');
    page.onDidDismiss(() => { this.getData() })
    page.present();
  } 

  changeQty(item:any,direct:number) {
    let qty = (Number(item.input_qty) || 0) + direct;
    if (qty >= 0) { item.input_qty = qty; }   
  }

  inputQty(item: any) {
    this.util.showPrompt('', '输入数量', [{ name: 'qty', placeholder: '请输入数量', type: 'number' }], data => {
      let qty = Number(data.qty);
      if (qty > 0) {
        item.input_qty = qty;
      } else {
        delete item.input_qty;
      }  
    });      
  }

  getChooseItem() {
    return this.items.filter((item, index) => {
      return item.input_qty > 0;
    });
  }

  confirmChoose() {
    this.viewCtrl.dismiss(this.getChooseItem());
  }
}
