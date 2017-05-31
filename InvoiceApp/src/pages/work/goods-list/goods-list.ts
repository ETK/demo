import {Component} from '@angular/core';
import {IonicPage,NavController} from 'ionic-angular';
import {UtilService} from '../../../providers/util-service';
import {SqlService} from "../../../providers/sql-service";

/*
 Generated class for the GoodsList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-goods-list',
    templateUrl: 'goods-list.html'
})
export class GoodsListPage {
    items: any;
    placeholder: string;
    myInput: string;
    totalData: any;


    constructor(public navCtrl: NavController, public util: UtilService, private sqlService: SqlService) {
        this.placeholder = "请输入关键字";
        this.myInput = "";
    }

    ionViewWillEnter() {
        //刷新界面
        this.getData();

    }

    getData() {
        this.sqlService.query('good').then((data) => {
            this.totalData = this.util.sqliteToArrqy(data.res.rows);
            this.items = this.totalData;
        }).catch((err) => {
            console.error(err);
        });
    }

    editItem(item) {
        this.navCtrl.push('GoodsEditPage', {item: item});
    }

    addItem() {
        this.navCtrl.push('GoodsEditPage');
    }

    deleteItem(item) {
        this.util.showConfirm('确定要删除此条数据?','提示', () => {
            let condition = "id='" + item.id + "'";
            this.sqlService.remove('good', condition).then(() => {
                this.getData();
            }).catch((err) => {
                console.error(err);
            })
        });
    }

    onInput() {
        let array: any = [];
        for (let data of this.items) {
            if (data.good_name.indexOf(this.myInput) >= 0 || data.good_no.indexOf(this.myInput) >= 0) {
                array.push(data);
            }
        }
        //console.log(array);
        this.util.refreshUI(() => {
            this.items = array;
        });

    }

    onClear() {
        this.items = this.totalData;
    }


}
