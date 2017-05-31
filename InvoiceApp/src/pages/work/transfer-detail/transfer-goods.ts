import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, ViewController } from 'ionic-angular';
import { SqlService } from '../../../providers/sql-service';
import { UtilService } from '../../../providers/util-service';


@IonicPage()
@Component({
  template: `
   <ion-header>

  <ion-navbar>
    <ion-title>选择商品</ion-title>    
  </ion-navbar>

</ion-header>

<ion-content>
  <ion-searchbar placeholder="输入商品编，名称查询" (ionInput)="search($event)"></ion-searchbar>
  <ion-list>
    <ion-item *ngFor="let item of items">
      <ion-thumbnail item-left>
        <img [src]="item.img">
      </ion-thumbnail>
      <h3>产品编号：{{item.good_no}}</h3>
      <h3>产品名称：{{item.good_name}}</h3>
      <h3>当前库存：{{item.qty}}</h3>

       <div item-right style="margin-right: -6px">
              <button ion-button (click)="changeQty(item,-1)" style="margin-right:-6px" clear icon-only >
               <ion-icon name="remove"></ion-icon>
           </button>
              <button ion-button (click)="inputQty(item)" style="min-width:35px" outline>
              {{item.input_qty}}
            </button>
              <button ion-button (click)="changeQty(item,1)" style="margin-left:-6px" bold clear icon-only >
               <ion-icon name="add"></ion-icon>
            </button>
            </div>

    </ion-item>
  </ion-list>  
</ion-content>
<ion-footer>
  <ion-item color="light">
     已选择:{{getCount()}}项
     <button ion-button  item-right (click)="confirmChoose()">确认</button>
  </ion-item>
</ion-footer>   
  `
})
export class TransferGoodsPage {
  parentPage: any;

  items: any[] = [];

  constructor(
    private navCtrl:NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private sqlHelp: SqlService,
    private util :UtilService
  ) { }

  ngOnInit() {
    if (this.navParams.get("parentPage")) {
      this.parentPage = this.navParams.data.parentPage;
      this.getData();
    }
  }

  getData(value:string="") {
    let sql = 'select a.*,b.qty from good a join stk b on a.good_no=b.good_no where b.store_no=?';
    let param = [this.parentPage.item.out_store_no];
    if (value) {
      sql += " and (a.good_no like '%?%' or a.good_name like '%?%')".replace(/\?/g, value);
    }
    this.sqlHelp.getRowsBySql(sql, param).then(rows => {
      this.items = [].concat(rows);
      let item;
      for (let obj of this.parentPage.goodsList) {
        item = this.items.find(i => { return i.good_no == obj.good_no });
        if (item) {
          item.input_qty = obj.qty;
        }
      }
    })
  }

  search(ev) {
    let val = ev.target.value;
    this.getData(val);
  }

  confirmChoose() {
    let inputArr: any[] = []
    for (let item of this.items) {
      if (item.input_qty) {
        inputArr.push({
          bill_no: this.parentPage.item.bill_no,
          good_no: item.good_no,
          qty: item.input_qty,
          cost_price: item.cost_price
        });
      }
    }
    this.parentPage.goodsList = [].concat(inputArr);
    this.navCtrl.pop();
  }

  inputQty(obj: any) {
    
    this.util.showPrompt('', '输入调拨数量', [{ name: 'qty', placeholder: '请输入调拨数量', type: 'number', value: obj.input_qty||'' }], data => {

      if (data.qty == "") {
        this.util.showAlert("请输入数量");
        return false;
      }
      if (Number(data.qty) > 0) {
        obj.input_qty = data.qty;
      }
    });
  }

  changeQty(item, dir) {
    let qty = (Number(item.input_qty) || 0) + dir;
    if (qty >= 0) { item.input_qty = qty; }   
  }
  
  getCount() {
    let count = 0;
    for (let item of this.items) {
      if (item.input_qty) {
        count++
      }
    }
    return count;
  }
}

