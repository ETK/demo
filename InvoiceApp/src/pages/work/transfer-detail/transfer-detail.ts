import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, ViewController, ModalController, PopoverController } from 'ionic-angular';
import { SqlService } from '../../../providers/sql-service';
import { UtilService } from '../../../providers/util-service';
import { StkService } from '../../../providers/stk-service';

/*
  调拨单明细页面
  wudefeng
  2017-5-11 
*/
@IonicPage()
@Component({
  selector: 'page-transfer-detail',
  templateUrl: 'transfer-detail.html'
})
export class TransferDetailPage {

  title: string = "新增调拨单";
  item: any = {};
  goodsList: any[] = []; 
  billStatus: string = '10';
  isAdd: boolean = true;
  storeList: any[] = [];
  parentPage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public sqlHelp: SqlService,
    public util: UtilService,
    public modalCtrl: ModalController,
    public stkService: StkService,
    public popoverCtrl: PopoverController
  ) { }

  ionViewDidLoad() {

    let obj = this.navParams.get('item');
    this.parentPage = this.navParams.get('parentPage');
    if (obj) {
      this.item = obj;
      this.sqlHelp.getRowsBySql('select a.*,b.cost_price from bl_transfer_dtl a join good b on a.good_no=b.good_no  where bill_no=?', [obj.bill_no]).then(data => {
        this.goodsList = [].concat(data);       
      });
      this.billStatus = obj.bill_status;
      this.isAdd = false;
      this.title = "调拨单明细";
    } else {
      this.item = {
        bill_status: '10',
        creator: this.util.loginUser,
        create_time: this.util.getNowFormatDate()
      }
      this.sqlHelp.getCodeNo("TO").then(no => {
        this.item.bill_no = no;
      });
    }  
  }

  exit(isChange: any = false) {
    this.parentPage && this.parentPage.getData && this.parentPage.getData(true);
    this.navCtrl.pop();
  }

  save() {
    let errmsg = "";
    if (this.item.out_store_no == this.item.in_store_no) {
      errmsg = "不能相同仓库进行调拨"
    }

    if (this.goodsList.length == 0) {
      errmsg = "还没有选择物料，不能保存";
    }
    if (errmsg.length > 0) {
      this.util.showAlert(errmsg, "错误");
      return;
    }
    let obj = {
      bill_no: this.item.bill_no,
      bill_status: this.item.bill_status,
      out_store_no: this.item.out_store_no,
      in_store_no: this.item.in_store_no,
      creator: this.util.loginUser,
      create_time: this.util.getNowFormatDate()
    }
    let dtllist = this.goodsList.map(item => { delete item.cost_price;return item; });
    this.sqlHelp.saveBill("bl_transfer", obj, "bl_transfer_dtl", dtllist).then(data => {
      console.info("单据保存成功");
      this.exit(true);
    }).catch(err => {
      console.error("保存失败", err);
    });
  }

  chooseStore(storetype: string) {

    if (this.goodsList.length > 0 || this.billStatus == "20") return;  

    let storepage = this.modalCtrl.create('DepotListPage', { isChoose: true });
  
    storepage.onDidDismiss(store => {
      if (store) {
        if (storetype == "O") {
          this.item.out_store_no = store.store_no;
          this.item.out_store_name = store.store_name;
        } else {
          this.item.in_store_no = store.store_no;
          this.item.in_store_name = store.store_name;
        }
      }
    });
    storepage.present();
  }

  changeQty(obj: any, qty: number) {
    if (qty == -1 && obj.qty == 1) return;
    obj.qty += qty;
  }

  inputQty(obj: any) {
    if (this.billStatus != "10") return;
    this.util.showPrompt('', '输入数量', [{ name: 'qty', placeholder: '请输入调拨数量', type: 'number', value: obj.qty }], data => {

      if (data.qty == "") {
        this.util.showAlert("请输入数量");
        return false;
      }
      if (Number(data.qty) > 0) {
        obj.qty = data.qty;
      }
    });
  }

  chooseGoods() {

    if (!this.item.in_store_no || !this.item.out_store_no) {
      this.util.showAlert("请先选择调出仓及调入仓");
      return;
    }
     this.navCtrl.push('TransferGoodsPage', { parentPage:this });
    
  }  

  deleteItem(item: any) {
    this.goodsList.splice(this.goodsList.indexOf(item), 1);
  }

  showMore(ev) {

    let popover = this.popoverCtrl.create('TransferToolPage', {
      parentPage: this
    }, { cssClass:"mypopover"});

    popover.present({
      ev: ev
    });
  }
  
  getTotalCost() {
    let cost = 0;
    for (let item of this.goodsList) {
      cost += item.cost_price * item.qty;
    }
    return cost;
  }

  getTotalCount() {
    return this.goodsList.length;
  }

}
