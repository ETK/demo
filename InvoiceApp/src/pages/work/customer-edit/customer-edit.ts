import {Component} from '@angular/core';
import {IonicPage,NavController, NavParams} from 'ionic-angular';
import {UtilService} from '../../../providers/util-service';
import {SqlService} from "../../../providers/sql-service";
import {Contacts} from '@ionic-native/contacts';

/*
 Generated class for the CustomerEdit page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-customer-edit',
    templateUrl: 'customer-edit.html'
})
export class CustomerEditPage {
    obj: any;
    item: any;
    flag: number;
    titleText: string;
    isCustomerNoDisabled: boolean;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private utilService: UtilService,
                private contacts: Contacts,
                private sqlService: SqlService) {
        this.item = this.navParams.get('item');
        if (this.item) {
            //编辑
            this.flag = 1;
            this.titleText = '编辑';
            this.isCustomerNoDisabled = true;
            this.obj = this.item;
        } else {
            //添加
            this.obj = {};
            this.titleText = '添加';
            this.isCustomerNoDisabled = false;
            this.flag = 2;
        }
    }

    //打开设备联系人列表选择
    openContacts() {
        this.contacts.pickContact().then((result) => {
            //alert(JSON.stringify(result));
            if (result) {
                this.obj.contact = result.displayName;
                this.obj.phone = result.phoneNumbers[0].value;
            }
        }).catch((err) => {
            alert(JSON.stringify(err));
        });

    }

    save() {
        if (!this.obj.customer_no || !this.obj.customer_name || !this.obj.customer_addr || !this.obj.contact || !this.obj.phone) {
            this.utilService.showToast("请注意查看必填信息");
            return;
        }

        const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        //验证手机号(暂时去掉)
        /*const regex = /^1[3|4|5|7|8][0-9]{9}$/;
         if (!regex.test(this.obj.phone)) {
         this.utilService.showToast("请输入正确的移动电话号码");
         return;
         }*/
        if (this.obj.email && !reg.test(this.obj.email)) {
            this.utilService.showToast("请输入正确的邮箱");
            return;
        }

        this.sqlService.save('customer', this.obj).then(() => {
            this.navCtrl.pop();
        }).catch((err) => {
            console.error(err);
        });

    }


}
