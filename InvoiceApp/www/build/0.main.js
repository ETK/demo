webpackJsonp([0],{

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__work__ = __webpack_require__(371);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkPageModule", function() { return WorkPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WorkPageModule = (function () {
    function WorkPageModule() {
    }
    return WorkPageModule;
}());
WorkPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__work__["a" /* WorkPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__work__["a" /* WorkPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__work__["a" /* WorkPage */]
        ]
    })
], WorkPageModule);

//# sourceMappingURL=work.module.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_update_service__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_order__ = __webpack_require__(220);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WorkPage = (function () {
    function WorkPage(navCtrl, updateService) {
        this.navCtrl = navCtrl;
        this.updateService = updateService;
        this.slides = []; //显示的数据
        this.pageNumber = 4; //同时显示的个数
        this.selectedIndex = 0; //选中的
        this.cells1 = []; //基础数据格子
        this.cells2 = []; //销售管理格子
        this.cells3 = []; //采购管理格子
        this.cells4 = []; //仓库管理格子
        this.cells5 = []; //测试格子
        this.cells = []; //显示的数据
        //this.updateService.checkUpdate();
        this.slides = ['基础数据', '销售管理', '采购管理', '仓库管理', '测试Demo'];
        this.cells1 = ['商品管理', '客户管理', '供应商管理', '用户管理', '仓库管理'];
        this.cells2 = ['订单管理'];
        this.cells3 = ['采购管理', '采购订单管理', '采购收货管理'];
        this.cells4 = ['库存查询', '进出仓明细', '调拨单', '盘点'];
        this.cells5 = ['demo'];
        this.cells = this.formatData(this.cells1);
    }
    WorkPage.prototype.openPages = function (modelno) {
        if (modelno == '商品管理') {
            this.navCtrl.push('GoodsListPage');
        }
        else if (modelno == '客户管理') {
            this.navCtrl.push('CustomerListPage');
        }
        else if (modelno == '供应商管理') {
            this.navCtrl.push('SupplierListPage');
        }
        else if (modelno == '用户管理') {
            this.navCtrl.push('UserListPage');
        }
        else if (modelno == '仓库管理') {
            this.navCtrl.push('DepotListPage');
        }
        else if (modelno == '订单管理') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__order_order__["a" /* orderManage */]);
        }
        else if (modelno == '采购管理') {
            //this.navCtrl.push(null);
        }
        else if (modelno == '采购订单管理') {
            this.navCtrl.push('PurchaseOrderListPage');
        }
        else if (modelno == '采购收货管理') {
            this.navCtrl.push('PurchaseRecListPage');
        }
        else if (modelno == '调拨单') {
            this.navCtrl.push('TransferListPage');
        }
        else if (modelno == '库存查询') {
            this.navCtrl.push('StkListPage');
        }
        else if (modelno == '盘点') {
            this.navCtrl.push('StkCheckPage');
        }
        else if (modelno == 'demo') {
            this.navCtrl.push('DemoListPage');
        }
        else if (modelno = "进出仓明细") {
            this.navCtrl.push('StkLogListPage');
        }
    };
    WorkPage.prototype.onClick = function (index, slide) {
        this.selectedIndex = index;
        if (slide == '基础数据') {
            this.cells = this.formatData(this.cells1);
        }
        else if (slide == '销售管理') {
            this.cells = this.formatData(this.cells2);
        }
        else if (slide == '采购管理') {
            this.cells = this.formatData(this.cells3);
        }
        else if (slide == '仓库管理') {
            this.cells = this.formatData(this.cells4);
        }
        else {
            this.cells = this.formatData(this.cells5);
        }
    };
    WorkPage.prototype.formatData = function (cells) {
        var a = new Array(), b = new Array();
        for (var i = 0; i < cells.length; i++) {
            b.push(cells[i]);
            if ((i + 1) % 3 == 0 && i != 1) {
                a.push(b);
                b = [];
            }
            else if (i + 1 == cells.length && cells % 3 != 0) {
                a.push(b);
            }
        }
        return a;
    };
    ;
    WorkPage.prototype.orderClick = function () {
        //��������
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__order_order__["a" /* orderManage */]);
    };
    return WorkPage;
}());
WorkPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-work',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\work.html"*/'<ion-header  >\n\n  <ion-navbar>\n\n    <ion-title>\n\n      业务工作台\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n\n\n<ion-content>\n\n\n\n  <ion-slides class="slide-title" [slidesPerView]="pageNumber" [pager]="false">\n\n    <ion-slide *ngFor="let slide of slides; let i = index;">\n\n      <div (click)="onClick(i,slide)">\n\n        <span class="slide-title-unit" [ngClass]="{\'slide-title-active\': selectedIndex == i}">{{slide}}</span>\n\n      </div>\n\n    </ion-slide>\n\n  </ion-slides>\n\n\n\n  <ion-grid>\n\n    <ion-row *ngFor="let cell of cells;">\n\n      <ion-col col-4 *ngFor="let item of cell;" (click)="openPages(item)">\n\n        <img src="assets/img/90110660.png">\n\n        <p>{{item}}</p>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\work.html"*/,
        styles: ['']
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_update_service__["a" /* UpdateService */]])
], WorkPage);

//# sourceMappingURL=work.js.map

/***/ })

});
//# sourceMappingURL=0.main.js.map