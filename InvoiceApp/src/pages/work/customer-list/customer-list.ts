import {Component} from "@angular/core";
import {IonicPage,NavController, NavParams} from "ionic-angular";
import {UtilService} from "../../../providers/util-service";
import {SqlService} from "../../../providers/sql-service";

/*
 Generated class for the CustomerList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-customer-list',
    templateUrl: 'customer-list.html'
})
export class CustomerListPage {
    items: any;
    placeholder: string;
    myInput: string;
    totalData: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public utilService: UtilService, private sqlService: SqlService) {
        this.placeholder = "请输入关键字";
        this.myInput = "" ;
    }

    ionViewWillEnter() {
        //刷新界面
        this.getData();
    }

    getData() {
        this.sqlService.query('customer').then((data)=>{
            this.totalData = this.utilService.sqliteToArrqy(data.res.rows);
            this.items = this.totalData;
        }).catch((err)=>{
            console.error(err);
        });

    }

    editItem(item) {
        this.navCtrl.push('CustomerEditPage', {item: item});
    }

    addItem() {
        this.navCtrl.push('CustomerEditPage');
    }

    deleteItem(item) {
        this.utilService.showConfirm('确定要删除此条数据?','提示', () => {
            //delete到数据库
           let condition="id='"+item.id+"'";
           this.sqlService.remove('customer',condition).then(()=>{
               this.getData();
           }).catch((err)=>{
               console.error(err);
           })
        });

    }

    onInput() {
        let array: any = [];
        for (let data of this.items) {
            if (data.customer_name.indexOf(this.myInput) >= 0 || data.customer_no.indexOf(this.myInput) >= 0) {
                array.push(data);
            }
        }
        //console.log(array);
        this.utilService.refreshUI(()=> {
            this.items = array;
        });

    }

    onClear() {
        this.items = this.totalData;
    }


}
