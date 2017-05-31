import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SqlService } from '../../../providers/sql-service';

/*
  Generated class for the CustList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-demo-list',
  templateUrl: 'demo-list.html'
})
export class DemoListPage {

  private customers: any[] = [];

  private searchKey:string="";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public sqlHelp: SqlService
  ) { }

  ionViewDidLoad() {
    this.getData();
  }

  addItem(customer:any) {
    let addModal = this.modalCtrl.create('DemoDetailPage',{customer:customer});

    addModal.onDidDismiss(item => {
      if (item) {
        this.getData();
      }
    })
    addModal.present();
  }

  getData() {
    this.customers = [];
    let condition="";
    if(this.searchKey){
       condition = "customer_no like '%"+condition+"%'";
    }
    this.sqlHelp.getRowsByTable("customer",condition).then(data => {
       this.customers = data;
    });
  }


  removeAll(){
      this.sqlHelp.remove("customer").then(()=>{
         this.customers=[];
      });      
  }
}
