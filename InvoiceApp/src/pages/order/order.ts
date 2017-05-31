import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UtilService} from '../../providers/util-service';

import{salesOrderList} from './salesOrder/list';

@Component({
    selector: 'page-order',
    templateUrl: 'order.html'
})

/*
*继承编辑页面基类
*/
export class orderManage {
    //设置明细页
    //public detailPage = orderItems;
    //设置页面标题
    public pageName:string ="订单管理";
    //public gridConfig:any;
    //public pageData:any;
    pageList:any;
    
    constructor(public navCtrl:NavController,public navParams:NavParams,public utilService:UtilService) {
        this.pageList = [{
                page:salesOrderList,
                title:"销售订单",
                icon:""
            },
            {
                page:null,
                title:"销售发货",
                icon:""
            },
            {
                page:null,
                title:"销售退货",
                icon:""
            },
            {
                page:null,
                title:"销售报表",
                icon:""
            }
            
        ];
    }

    openPages(pageObj) {
        if (!pageObj) return;
        if(!pageObj.page){
            this.utilService.showAlert("提示","模块未定义",function(){

            });
            return;
        }
        this.navCtrl.push(pageObj.page);
    }
}