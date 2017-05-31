import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,ViewController } from 'ionic-angular';
import {UtilService} from '../../../providers/util-service';
import { SqlService } from '../../../providers/sql-service';
/*
  Generated class for the SupplierAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-supplier-add',
  templateUrl: 'supplier-add.html'
})
export class SupplierAddPage {
  supplier:any;
  operation:string;
  constructor(public navCtrl: NavController,public util:UtilService,public navParams: NavParams,public sqlHelp:SqlService,public viewCtrl:ViewController) {
    if(navParams.get('detail')){
      this.supplier = navParams.get('detail')
    }else {
      this.supplier = {};
    }
    this.operation = navParams.get('operation');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupplierAddPage');
  }


  save(){
    if(!this.supplier.supplier_no){
      this.sqlHelp.getCodeNo('SN', false).then( no =>{
        this.supplier.supplier_no = no;
        if (!this.supplier.supplier_no || !this.supplier.supplier_name || !this.supplier.phone || !this.supplier.contact ) {
          this.util.showToast("请把所有信息填完整");
          return;
        }
        this.sqlHelp.save('supplier', this.supplier).catch((err)=>{
          console.info(err);
        })
        this.viewCtrl.dismiss(true);

      })
    }else{
      if (!this.supplier.supplier_no || !this.supplier.supplier_name || !this.supplier.phone || !this.supplier.contact ) {
        this.util.showToast("请把所有信息填完整");
        return;
      }
      this.sqlHelp.save('supplier', this.supplier).catch((err)=>{
        console.info(err);
      })
      this.viewCtrl.dismiss(true);
    }

  }
}
