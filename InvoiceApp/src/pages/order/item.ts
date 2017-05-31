import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UtilService} from '../../providers/util-service';
import {baseEditItemPage} from '../baseEditPage/baseEditItemPage';
import {FormGroup, FormControl} from '@angular/forms';
/*
 Generated class for the AddItem page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

@Component({
    selector: 'page-item-item',
    templateUrl: 'item.html'
})

export class orderItems extends baseEditItemPage {
    fields:any;
    form:FormGroup;

    customerData:any;
    merchandiserData:any;

    constructor(public navCtrl:NavController, private util: UtilService,public navParams: NavParams) {
        super(navCtrl,util,navParams);
    }

    

    public initPage(){
        //调用父类方法;

        this.form = new FormGroup({
            billNo :new FormControl(),
            deliveryTime :new FormControl(),
            customerName :new FormControl(),
            merchandiser :new FormControl(),
            remarks :new FormControl()
        });

        this.customerData=[{
                customerNo:"01",
                customerName:"测试客户"
        }];

        this.merchandiserData=[{
            merchandiserNo:"01",
            merchandiser:"测试跟单"
        }];

        super.initPage();
        
    }
}


