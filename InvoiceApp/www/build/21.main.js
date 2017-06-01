webpackJsonp([21],{

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__demo_detail__ = __webpack_require__(350);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoDetailPageModule", function() { return DemoDetailPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DemoDetailPageModule = (function () {
    function DemoDetailPageModule() {
    }
    return DemoDetailPageModule;
}());
DemoDetailPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__demo_detail__["a" /* DemoDetailPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__demo_detail__["a" /* DemoDetailPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__demo_detail__["a" /* DemoDetailPage */]
        ]
    })
], DemoDetailPageModule);

//# sourceMappingURL=demo-detail.module.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_stk_service__ = __webpack_require__(214);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoDetailPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the CustomerDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var DemoDetailPage = (function () {
    function DemoDetailPage(navCtrl, navParams, viewCtrl, sqlHelp, stkService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.sqlHelp = sqlHelp;
        this.stkService = stkService;
        this.customer = {};
        this.isNew = true;
        this.stk = {
            good_no: 'NLD0001',
            store_no: 'DL01',
            in_out_flag: 'I',
            qty: 10
        };
        this.billNo = "";
    }
    DemoDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var obj = this.navParams.get('customer');
        if (obj) {
            this.customer = obj;
            this.isNew = false;
        }
        else {
            this.sqlHelp.getCodeNo("KH", false).then(function (no) {
                _this.customer.customer_no = no;
            });
        }
        this.getBillNo();
    };
    /**
     * 保存对象
     */
    DemoDetailPage.prototype.save = function () {
        this.sqlHelp.save("customer", this.customer).catch(function (err) {
            console.info(err);
        });
        this.viewCtrl.dismiss(true);
    };
    /**
     * 取单号
     */
    DemoDetailPage.prototype.getBillNo = function () {
        var _this = this;
        this.sqlHelp.getCodeNo("SO").then(function (no) {
            _this.billNo = no;
        });
    };
    DemoDetailPage.prototype.savestk = function () {
        this.stkService.stkInOut(this.stk.good_no, this.stk.store_no, this.stk.qty, this.billNo, this.stk.in_out_flag).then(function (result) {
            console.info("库存操作成功", result);
        }).catch(function (err) {
            console.error("出错了!!!", err);
        });
    };
    return DemoDetailPage;
}());
DemoDetailPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-demo-detail',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\demo-detail\demo-detail.html"*/'<!--\n\n  demo\n\n  wudefeng\n\n  2017.5.4\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>demo</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content >\n\n\n\n  <div> 客户信息\n\n    <ion-item>\n\n      <ion-label>客户编号</ion-label>\n\n      <ion-input type="text" placeholder="编号" [(ngModel)]="customer.customer_no" disabled="true"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>客户名称</ion-label>\n\n      <ion-input type="text" placeholder="名称" [(ngModel)]="customer.customer_name"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>客户地址</ion-label>\n\n      <ion-input type="text" placeholder="地址" [(ngModel)]="customer.customer_addr"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>联系人</ion-label>\n\n      <ion-input type="text" placeholder="联系人" [(ngModel)]="customer.contact"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>联系电话</ion-label>\n\n      <ion-input type="number" placeholder="电话" [(ngModel)]="customer.phone"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>邮箱</ion-label>\n\n      <ion-input type="email" placeholder="邮箱" [(ngModel)]="customer.email"></ion-input>\n\n    </ion-item>\n\n    <button ion-button block (click)="save()">保存</button>\n\n  </div>\n\n\n\n  <p class="bottomitem">\n\n    <button ion-button item-right (click)="getBillNo()">获取单号</button> 单据编号:{{billNo}}\n\n  </p>\n\n\n\n\n\n  <div> 库存操作：\n\n    <ion-item>\n\n      <ion-label>商品编号</ion-label>\n\n      <ion-input type="text" [(ngModel)]="stk.good_no"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>仓库编号</ion-label>\n\n      <ion-input type="text" [(ngModel)]="stk.store_no"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>进/出仓</ion-label>\n\n      <ion-select [(ngModel)]="stk.in_out_flag">\n\n        <ion-option value="I">进仓</ion-option>\n\n        <ion-option value="O">出仓</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n      <ion-item>\n\n        <ion-label>数量</ion-label>\n\n        <ion-input type="number" [(ngModel)]="stk.qty"></ion-input>\n\n      </ion-item>\n\n      <button ion-button block (click)="savestk()">保存</button>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\demo-detail\demo-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__["a" /* SqlService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_stk_service__["a" /* StkService */]])
], DemoDetailPage);

//# sourceMappingURL=demo-detail.js.map

/***/ })

});
//# sourceMappingURL=21.main.js.map