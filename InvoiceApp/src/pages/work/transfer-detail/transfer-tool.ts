import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/*
  调拨单明细页面弹出工具条
  wudefeng
  2017-5-11 
*/
@IonicPage()
@Component({
  selector: 'page-transfer-tool',
  template: `
    <ion-list>
    <button ion-item tappable  (click)="remove()" detail-none>
          <ion-icon name='trash' ></ion-icon> 
          删除 
     </button>
     <button ion-item tappable  (click)="audit()" detail-none >
          <ion-icon name="lock"></ion-icon> 
          审核 
     </button>     
    </ion-list>
  ` 
})
export class TransferToolPage {
  parentPage: any;
  
  constructor(private navParams: NavParams, private viewCtrl: ViewController) {
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.parentPage = this.navParams.data.parentPage;     
    }
  }

  exit(isChange:boolean=false) {
    this.viewCtrl.dismiss();
    this.parentPage.exit(isChange);
  }

  remove() {
    this.parentPage.util.showConfirm("确认删除？", "", () => {
      this.parentPage.sqlHelp.removeBill("bl_transfer", "bl_transfer_dtl", this.parentPage.item.bill_no).then(data => {
        this.parentPage.exit(true);
      });
      this.viewCtrl.dismiss();
    });   
  }

  audit() {
    this.parentPage.util.showConfirm("确认审核？", "", () => {
      this.parentPage.stkService.stkBiz(this.parentPage.item.bill_no, "1006").then(data => {
        if (data.result == "1") {
          this.parentPage.util.showAlert(data.msg, "出错了");
          return;
        }
        this.exit(true);
      });
    });
  }
}

