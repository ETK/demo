import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, ViewController } from 'ionic-angular';
import { UtilService } from '../../../providers/util-service';
import { SqlService } from "../../../providers/sql-service";

/*
  Generated class for the DepotList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
    selector: 'page-depot-list',
    templateUrl: 'depot-list.html'
})
export class DepotListPage {
    title: string = "仓库管理";
    items: any;
    placeholder: string;
    myInput: string;
    totalData: any;
    isChoose: boolean = false; //用于判断是否是选择仓库返回值用

    constructor(public navCtrl: NavController,
        private utilService: UtilService,
        private sqlService: SqlService,
        public navParams: NavParams,
        public viewCtrl: ViewController) {
        this.placeholder = "请输入关键字";
        this.myInput = "";
        this.getData();

    }

    ionViewDidLoad() {
        if (this.navParams.get("isChoose")) {
            this.isChoose = true;
            this.title = "选择仓库";
        }
    }

    getData() {
        this.sqlService.query('depot').then((data) => {
            this.totalData = this.utilService.sqliteToArrqy(data.res.rows);
            this.items = this.totalData;
        }).catch((err) => {
            console.error(err);
        });
    }

    addItem() {
        let inputs = [
            { name: 'depot_no', placeholder: '请输入仓库编号', type: 'number' },
            { name: 'depot_name', placeholder: '请输入仓库名' }
        ];
        this.utilService.showPrompt('', '新增仓库', inputs, ((data) => {
            if (!data.depot_no || !data.depot_name) {
                data['flag'] = false;
                this.utilService.showToast('仓库编号和仓库名不能为空');
            } else {
                let isRepeat: boolean = false;
                for (let item of this.totalData) {
                    if (item.depot_no == data.depot_no) {
                        isRepeat = true;
                        break;
                    }
                }
                if (isRepeat) {
                    data['flag'] = false;
                    this.utilService.showToast('此编号仓库已存在');
                } else {
                    this.add(data);
                }


            }

        }))
    }

    add(data) {
        let obj = {
            'depot_no': data.depot_no,
            'depot_name': data.depot_name
        };
        this.sqlService.save('depot', obj).then(() => {
            this.getData();
        }).catch((err) => {
            console.error(err);
        });
    }

    editItem(item) {

        //选择仓库
        if (this.isChoose) {
            let store = {
                store_no: item.depot_no,
                store_name: item.depot_name
            }
            this.viewCtrl.dismiss(store);
            return;
        }

        //更改仓库
        let inputs = [
            { name: 'depot_name', placeholder: item.depot_name }
        ];
        this.utilService.showPrompt('', '编辑仓库', inputs, ((data) => {
            if (!data.depot_name) {
                data['flag'] = false;
                this.utilService.showToast('仓库名不能为空');
            } else {
                let sql = "update depot set depot_name='" + data.depot_name + "' where depot_no='" + item.depot_no + "'";
                this.sqlService.execSql(sql, []).then(() => {
                    this.getData();
                }).catch((err) => {
                    console.error(err);
                });
            }
        }))

    }

    onInput() {
        let array: any = [];
        for (let data of this.items) {
            if (data.user_no.indexOf(this.myInput) >= 0 || data.username.indexOf(this.myInput) >= 0) {
                array.push(data);
            }
        }
        //console.log(array);
        this.utilService.refreshUI(() => {
            this.items = array;
        });
    }
    onClear() {
        this.items = this.totalData;
    }



}
