import { Component ,NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {UtilService} from '../../../providers/util-service';
import { SqlService } from '../../../providers/sql-service';
/*
  Generated class for the PurchaseRecList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-purchase-rec-list',
  templateUrl: 'purchase-rec-list.html'
})
export class PurchaseRecListPage {
  items: any;
  placeholder: string;
  myInput: string;
  totalData: any;
  operation:string = 'add';
  private searchKey:string="";
  tableName:string = "purchase_rec";
  public selectItems:any = [];
  constructor(public navCtrl: NavController,public  util: UtilService , public navParams: NavParams, private _ngZone: NgZone,
              public sqlHelp:SqlService,public modalCtrl: ModalController) {
    this.placeholder = '请输入关键字';
    this.myInput  = '';

  }

  ionViewDidLoad() {
    //刷新
    this.getData();
  }



  getData() {
    this.items = [];
    var condition="";
    if(this.searchKey){
      condition = "bill_no like '%"+condition+"%'";
    }
    this.sqlHelp.query(this.tableName, condition).then(data => {
      if (data.res.rows.length > 0) {
        this.totalData = this.util.sqliteToArrqy(data.res.rows);
        this.items = this.totalData;
      }
    });
  }

  addItem(){

    let addModal = this.modalCtrl.create('PurchaseRecDetailPage',{operation:false});
    addModal.onDidDismiss(item => {
      if (item) {
        this.getData();
      }
    })
    addModal.present();
  }

  editItem(item) {
    this.navCtrl.push('PurchaseRecDetailPage', {detail:item,operation:true});
  }

  // itemDetail(item){
  //   this.operation = 'detail';
  //   this.navCtrl.push(PurchaseRecDetailPage, {detail:{supplier_no:'A0001',supplier_name:'明细'},operation:this.operation});
  // }

  deleteItem(item) {
    this.util.showConfirm('提示', '确定要删除此条数据?', () => {
      //delete到数据库
      var condition="";
      condition = "bill_no = '"+item.bill_no+"'";
      this.sqlHelp.remove(this.tableName, condition).then(data => {
        this.getData();
      });
    });

  }
  deleteAllItem(){
    if(this.selectItems.length <= 0  ){this.util.showAlert("请选中要删除的数据");return false;}
    this.util.showConfirm('提示', '确定要删除选中的数据?', () => {
      //delete到数据库
      var condition="bill_no in (";
      for (let data of this.selectItems) {
        condition += " '"+data+"',";
      }
      condition = condition.substring(0,condition.length-1);
      condition += ") "
      this.sqlHelp.remove(this.tableName, condition).then(data => {
        this.selectItems = [];
        this.getData();
      });
    });
  }
  onInput() {
    let array: any = [];
    for (let data of this.items) {
      if ( data.bill_no.indexOf(this.myInput) >= 0) {
        array.push(data);
      }
    }
    //console.log(array);
    this._ngZone.run(() => {
      this.items = array;
    });

  }
  insertUserToArray(item,enent){
    if(enent.checked){
      this.selectItems.push(item.bill_no);
    }else{
      this.selectItems.splice(this.selectItems.indexOf(item.bill_no),1)
    }
  }
  onClear() {
    this.items = this.totalData;
  }
  fastAddItem(){

  }
}
