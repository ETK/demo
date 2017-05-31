import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {NavController, NavParams} from 'ionic-angular';
import {UtilService} from '../../providers/util-service';

/*
 Generated class for the AddItem page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-baseEditItem',
    templateUrl: 'baseEditItemPage.html'
})


export class baseEditItemPage {
    fields:any;
    record:any;
    flag:string;
    parentObj:any;

    form:FormGroup;
    constructor(public navCtrl:NavController,public data:UtilService,public navParams:NavParams) {
        this.initPage();
    }

    ngAfterViewInit() {
        //刷新界面
        this.bindData();
    }

    public initPage(){
        this.record = this.navParams.get('record')||{};
        this.flag = this.navParams.get('flag');
        this.parentObj = this.navParams.get('parentObj');
    }

    bindData(){
        if(this.flag=="add"){
            this.record = {
                billNo:"NO000000000001"
            }
        }

        
    }

    save(){
        if(!this.form.valid ) return;

        if(this.flag=="add"){
            //this.parentObj.pageData.gridRows.push(this.record);
        }
    }

    delete(){
        
    }

}


