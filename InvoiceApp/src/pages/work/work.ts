import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';
import { UpdateService, } from '../../providers/update-service';


import { orderManage } from '../order/order';

@IonicPage()
@Component({
    selector: 'page-work',
    templateUrl: 'work.html',
    styles:['']
})
export class WorkPage {
    slides: string[] = [];//显示的数据
    pageNumber: number = 4;//同时显示的个数
    selectedIndex: number = 0;//选中的
    cells1: string[] = [];//基础数据格子
    cells2: string[] = [];//销售管理格子
    cells3: string[] = [];//采购管理格子
    cells4: string[] = [];//仓库管理格子
    cells5: string[] = [];//测试格子
    cells: string[] = [];//显示的数据



    constructor(public navCtrl: NavController,
        private updateService: UpdateService) {
        //this.updateService.checkUpdate();
        this.slides = ['基础数据', '销售管理', '采购管理', '仓库管理', '测试Demo'];
        this.cells1 = ['商品管理', '客户管理', '供应商管理', '用户管理', '仓库管理'];
        this.cells2 = ['订单管理'];
        this.cells3 = ['采购管理', '采购订单管理', '采购收货管理'];
        this.cells4 = ['库存查询', '进出仓明细', '调拨单', '盘点'];
        this.cells5 = ['demo'];
        this.cells = this.formatData(this.cells1);
    }

    openPages(modelno: string) {
        if (modelno == '商品管理') {
            this.navCtrl.push('GoodsListPage');
        } else if (modelno == '客户管理') {
            this.navCtrl.push('CustomerListPage');
        } else if (modelno == '供应商管理') {
            this.navCtrl.push('SupplierListPage');
        } else if (modelno == '用户管理') {
            this.navCtrl.push('UserListPage');
        } else if (modelno == '仓库管理') {
            this.navCtrl.push('DepotListPage');
        } else if (modelno == '订单管理') {
            this.navCtrl.push(orderManage);
        } else if (modelno == '采购管理') {
            //this.navCtrl.push(null);
        } else if (modelno == '采购订单管理') {
            this.navCtrl.push('PurchaseOrderListPage');
        } else if (modelno == '采购收货管理') {
            this.navCtrl.push('PurchaseRecListPage');
        } else if (modelno == '调拨单') {
            this.navCtrl.push('TransferListPage');
        } else if (modelno == '库存查询') {
            this.navCtrl.push('StkListPage');
        } else if (modelno == '盘点') {
            this.navCtrl.push('StkCheckPage');
        } else if (modelno == 'demo') {
            this.navCtrl.push('DemoListPage');
        } else if (modelno = "进出仓明细") {
            this.navCtrl.push('StkLogListPage');
        }
    }

    onClick(index, slide) {
        this.selectedIndex = index;
        if (slide == '基础数据') {
            this.cells = this.formatData(this.cells1);
        } else if (slide == '销售管理') {
            this.cells = this.formatData(this.cells2);
        } else if (slide == '采购管理') {
            this.cells = this.formatData(this.cells3);
        } else if (slide == '仓库管理') {
            this.cells = this.formatData(this.cells4);
        } else {
            this.cells = this.formatData(this.cells5);
        }
    }

    formatData(cells) {
        let a = new Array(), b = new Array();
        for (let i = 0; i < cells.length; i++) {
            b.push(cells[i]);
            if ((i + 1) % 3 == 0 && i != 1) {
                a.push(b);
                b = [];
            } else if (i + 1 == cells.length && cells % 3 != 0) {
                a.push(b);
            }
        }
        return a;
    };


    orderClick() {
        //��������
        this.navCtrl.push(orderManage);
}
}
