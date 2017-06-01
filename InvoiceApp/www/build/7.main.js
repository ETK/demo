webpackJsonp([7],{

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__supplier_add__ = __webpack_require__(364);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupplierAddPageModule", function() { return SupplierAddPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SupplierAddPageModule = (function () {
    function SupplierAddPageModule() {
    }
    return SupplierAddPageModule;
}());
SupplierAddPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__supplier_add__["a" /* SupplierAddPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__supplier_add__["a" /* SupplierAddPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__supplier_add__["a" /* SupplierAddPage */]
        ]
    })
], SupplierAddPageModule);

//# sourceMappingURL=supplier-add.module.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupplierAddPage; });
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
  Generated class for the SupplierAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SupplierAddPage = (function () {
    function SupplierAddPage(navCtrl, util, navParams, sqlHelp, viewCtrl) {
        this.navCtrl = navCtrl;
        this.util = util;
        this.navParams = navParams;
        this.sqlHelp = sqlHelp;
        this.viewCtrl = viewCtrl;
        if (navParams.get('detail')) {
            this.supplier = navParams.get('detail');
        }
        else {
            this.supplier = {};
        }
        this.operation = navParams.get('operation');
    }
    SupplierAddPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SupplierAddPage');
    };
    SupplierAddPage.prototype.save = function () {
        var _this = this;
        if (!this.supplier.supplier_no) {
            this.sqlHelp.getCodeNo('SN', false).then(function (no) {
                _this.supplier.supplier_no = no;
                if (!_this.supplier.supplier_no || !_this.supplier.supplier_name || !_this.supplier.phone || !_this.supplier.contact) {
                    _this.util.showToast("请把所有信息填完整");
                    return;
                }
                _this.sqlHelp.save('supplier', _this.supplier).catch(function (err) {
                    console.info(err);
                });
                _this.viewCtrl.dismiss(true);
            });
        }
        else {
            if (!this.supplier.supplier_no || !this.supplier.supplier_name || !this.supplier.phone || !this.supplier.contact) {
                this.util.showToast("请把所有信息填完整");
                return;
            }
            this.sqlHelp.save('supplier', this.supplier).catch(function (err) {
                console.info(err);
            });
            this.viewCtrl.dismiss(true);
        }
    };
    return SupplierAddPage;
}());
SupplierAddPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-supplier-add',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\supplier-add\supplier-add.html"*/'<!--\n\n  Generated template for the SupplierAdd page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n\n\n    <ion-title *ngIf="operation == \'add\'">新增供应商</ion-title>\n\n    <ion-title *ngIf="operation == \'edit\'">编辑供应商信息</ion-title>\n\n    <ion-title *ngIf="operation == \'detail\'">供应商信息</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-item>\n\n      <ion-label>编号</ion-label>\n\n      <ion-input type="text" [(ngModel)]="supplier.supplier_no" readonly="true" placeholder="供应商编号"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>名称</ion-label>\n\n      <ion-input type="text" [(ngModel)]="supplier.supplier_name" placeholder="供应商名称"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>地址</ion-label>\n\n      <ion-input type="text" [(ngModel)]="supplier.supplier_addr" placeholder="供应商地址"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>联系人</ion-label>\n\n      <ion-input type="text" [(ngModel)]="supplier.contact" placeholder="供应商联系人"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>电话</ion-label>\n\n      <ion-input type="text" [(ngModel)]="supplier.phone" placeholder="供应商电话"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>邮箱</ion-label>\n\n      <ion-input type="text" [(ngModel)]="supplier.email" placeholder="邮箱"></ion-input>\n\n    </ion-item>\n\n\n\n  </ion-list>\n\n  <button ion-button block (click)="save()" *ngIf="operation == \'add\' || operation == \'edit\'">Save</button>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\supplier-add\supplier-add.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_util_service__["a" /* UtilService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__["a" /* SqlService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]])
], SupplierAddPage);

//# sourceMappingURL=supplier-add.js.map

/***/ })

});
//# sourceMappingURL=7.main.js.map