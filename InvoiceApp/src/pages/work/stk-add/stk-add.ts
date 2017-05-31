import {Component} from '@angular/core';
import {IonicPage,NavController, NavParams, ViewController} from 'ionic-angular';
import {SqlService} from '../../../providers/sql-service';
import {UtilService} from '../../../providers/util-service';

/*
 Generated class for the StkAdd page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-stk-add',
  templateUrl: 'stk-add.html'
})
export class StkAddPage {
  private tableName: string = "stk_in_out_dtl";
  private item: any = {};
  private isNew: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public sqlService: SqlService,
              public utilService: UtilService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StkAddPage');
    let obj = this.navParams.get('stk');
    if (obj) {
      this.item = obj;
      this.isNew = false;
    }
  }

  save() {
    let judage = "select * from stk where good_no='" + this.item.good_no + "' and cell_no='" + this.item.cell_no + "'";
    console.info(judage);
    this.sqlService.queryBySql(judage, "").then(
      (data) => {
        //TODO-判断是否有相关库存
        let goOn = true;
        let stkBean: any;
        if (this.item.in_out_flag == 1) {
          if (data.res.rows.length <= 0 || data.res.rows.item(0).qty < this.item.qty) {
            goOn = false;
          } else {
            stkBean = data.res.rows.item(0);
            stkBean.qty = this.utilService.floatSub(stkBean.qty,this.item.qty);
          }
        } else {
          if (data.res.rows.length <= 0) {
            stkBean = {
              "good_no": this.item.good_no,
              "cell_no": this.item.cell_no,
              "qty": this.item.qty
            };
          } else {
            stkBean = data.res.rows.item(0);
            stkBean.qty = this.utilService.floatAdd(stkBean.qty,this.item.qty);
          }
        }
        //next action--
        if (goOn) {
          this.sqlService.save(this.tableName, this.item).then(
            (rec) => {
              //TODO-新增进出明细后，更新库存表信息；
              //1、库存表没有相关记录，则新增；
              //2、进出标识为0，则库存数量累加，否则累减
              this.sqlService.save("stk", stkBean).then(
                res => {
                  console.info(rec);
                  this.viewCtrl.dismiss(true);
                },
                (err) => {
                  this.utilService.showAlert("提示",err,()=>{});
                });
            },
            (err) => {
              this.utilService.showAlert("提示",err,null);
            });
        } else {
          this.utilService.showToast("该商品在当前储位没有足够库存，不允许做出仓操作！");
        }
      },
      err => {
        this.utilService.showToast(err);
      }
    );
  }

}
