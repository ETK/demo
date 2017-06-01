webpackJsonp([20],{

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__demo_list__ = __webpack_require__(351);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoListPageModule", function() { return DemoListPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DemoListPageModule = (function () {
    function DemoListPageModule() {
    }
    return DemoListPageModule;
}());
DemoListPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__demo_list__["a" /* DemoListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__demo_list__["a" /* DemoListPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__demo_list__["a" /* DemoListPage */]
        ]
    })
], DemoListPageModule);

//# sourceMappingURL=demo-list.module.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoListPage; });
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
  Generated class for the CustList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var DemoListPage = (function () {
    function DemoListPage(navCtrl, navParams, modalCtrl, sqlHelp) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.sqlHelp = sqlHelp;
        this.customers = [];
        this.searchKey = "";
    }
    DemoListPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    DemoListPage.prototype.addItem = function (customer) {
        var _this = this;
        var addModal = this.modalCtrl.create('DemoDetailPage', { customer: customer });
        addModal.onDidDismiss(function (item) {
            if (item) {
                _this.getData();
            }
        });
        addModal.present();
    };
    DemoListPage.prototype.getData = function () {
        var _this = this;
        this.customers = [];
        var condition = "";
        if (this.searchKey) {
            condition = "customer_no like '%" + condition + "%'";
        }
        this.sqlHelp.getRowsByTable("customer", condition).then(function (data) {
            _this.customers = data;
        });
    };
    DemoListPage.prototype.removeAll = function () {
        var _this = this;
        this.sqlHelp.remove("customer").then(function () {
            _this.customers = [];
        });
    };
    return DemoListPage;
}());
DemoListPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-demo-list',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\demo-list\demo-list.html"*/'<!--\n\n  Generated template for the CustList page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Demo</ion-title>\n\n\n\n     <ion-buttons end>\n\n      <button ion-button icon-only (click)="addItem()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n       <button ion-button icon-only (click)="removeAll()">\n\n        <ion-icon name="remove"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n <ion-searchbar  placeholder="输入关键字查询" [(ngModel)]="searchKey" (keyup)="getData()"></ion-searchbar>\n\n\n\n  <div class="row header">\n\n    <div class="col">客户编号</div>\n\n    <div class="col">客户名称</div>\n\n    <div class="col">联系人</div>\n\n    <div class="col">电话</div>\n\n    <div class="col">邮箱</div>\n\n  </div>\n\n  <div class="row" *ngFor="let customer of customers" (click)="addItem(customer)">\n\n    <div class="col">{{customer.customer_no}}</div>\n\n    <div class="col">{{customer.customer_name}}</div>\n\n    <div class="col">{{customer.contact}}</div>\n\n    <div class="col">{{customer.phone}}</div>\n\n    <div class="col">{{customer.email}}</div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\demo-list\demo-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__["a" /* SqlService */]])
], DemoListPage);

//# sourceMappingURL=demo-list.js.map

/***/ })

});
//# sourceMappingURL=20.main.js.map