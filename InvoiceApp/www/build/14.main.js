webpackJsonp([14],{

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__purchase_rec_detail__ = __webpack_require__(357);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseRecDetailPageModule", function() { return PurchaseRecDetailPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PurchaseRecDetailPageModule = (function () {
    function PurchaseRecDetailPageModule() {
    }
    return PurchaseRecDetailPageModule;
}());
PurchaseRecDetailPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__purchase_rec_detail__["a" /* PurchaseRecDetailPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__purchase_rec_detail__["a" /* PurchaseRecDetailPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__purchase_rec_detail__["a" /* PurchaseRecDetailPage */]
        ]
    })
], PurchaseRecDetailPageModule);

//# sourceMappingURL=purchase-rec-detail.module.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PurchaseRecDetailPage; });
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
  Generated class for the PurchaseRecDetail page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var PurchaseRecDetailPage = (function () {
    function PurchaseRecDetailPage(navCtrl, util, navParams, sqlHelp, viewCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.util = util;
        this.navParams = navParams;
        this.sqlHelp = sqlHelp;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.supplierList = [];
        this.purchaseOrderList = [];
        this.details = [];
        this.allGoods = [];
        this.readonlyStatus = true;
        if (navParams.get('detail')) {
            this.purchaseRec = navParams.get('detail');
            this.getDetails(this.purchaseRec.bill_no);
        }
        else {
            var date = new Date();
            this.purchaseRec = { bill_status: '10', create_time: date.getFullYear() + "-" + ((date.getMonth() + 1) > 9 ? date.getMonth() + 1 : 0 + "" + (date.getMonth() + 1)) + "-" + (date.getDate() > 9 ? date.getDate() : 0 + "" + date.getDate()) };
        }
        this.readonlyStatus = navParams.get('operation');
        this.getSupplier();
        this.getPurchaseOrder();
    }
    PurchaseRecDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad purchaseOrderPage');
    };
    PurchaseRecDetailPage.prototype.getSupplier = function () {
        var _this = this;
        this.sqlHelp.query("supplier", "").then(function (data) {
            if (data.res.rows.length > 0) {
                _this.supplierList = _this.util.sqliteToArrqy(data.res.rows);
            }
        });
    };
    PurchaseRecDetailPage.prototype.getPurchaseOrder = function () {
        var _this = this;
        this.sqlHelp.query("purchase_order", "").then(function (data) {
            if (data.res.rows.length > 0) {
                _this.purchaseOrderList = _this.util.sqliteToArrqy(data.res.rows);
            }
        });
    };
    PurchaseRecDetailPage.prototype.getDetails = function (billNo) {
        var _this = this;
        if (!billNo) {
            return;
        }
        this.sqlHelp.query("purchase_rec_detail", "bill_no = '" + billNo + "'").then(function (data) {
            if (data.res.rows.length > 0) {
                _this.details = _this.util.sqliteToArrqy(data.res.rows);
            }
        });
    };
    PurchaseRecDetailPage.prototype.save = function () {
        var _this = this;
        if (!this.purchaseRec.supplier_no || !this.purchaseRec.create_time) {
            this.util.showToast("请把所有信息填完整");
            return;
        }
        if (!this.purchaseRec.bill_no) {
            this.sqlHelp.getCodeNo('RC', true).then(function (no) {
                _this.purchaseRec.bill_no = no;
                _this.sqlHelp.save('purchase_rec', _this.purchaseRec).then(function (err) {
                    for (var _i = 0, _a = _this.details; _i < _a.length; _i++) {
                        var de = _a[_i];
                        de.bill_no = _this.purchaseRec.bill_no;
                        _this.sqlHelp.save('purchase_rec_detail', de).catch(function (err) {
                            console.info(err);
                        });
                    }
                });
                _this.viewCtrl.dismiss(true);
            });
        }
        else {
            this.sqlHelp.save('purchase_rec', this.purchaseRec).then(function (err) {
                for (var _i = 0, _a = _this.details; _i < _a.length; _i++) {
                    var de = _a[_i];
                    de.bill_no = _this.purchaseRec.bill_no;
                    _this.sqlHelp.save('purchase_rec_detail', de).catch(function (err) {
                        console.info(err);
                    });
                }
            });
            this.viewCtrl.dismiss(true);
        }
    };
    PurchaseRecDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    PurchaseRecDetailPage.prototype.editItem = function () {
        this.readonlyStatus = false;
    };
    PurchaseRecDetailPage.prototype.getGoodData = function () {
        var _this = this;
        this.sqlHelp.query('good').then(function (data) {
            _this.allGoods = _this.util.sqliteToArrqy(data.res.rows);
        }).catch(function (err) {
            console.error(err);
        });
    };
    PurchaseRecDetailPage.prototype.addGoods = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('请选择商品');
        for (var _i = 0, _a = this.allGoods; _i < _a.length; _i++) {
            var good = _a[_i];
            alert.addInput({
                type: 'checkbox',
                label: good.good_name,
                value: good.good_no,
                checked: false
            });
        }
        alert.addInput({
            type: 'checkbox',
            label: "商品1",
            value: "good1",
            checked: false
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Okay',
            handler: function (data) {
                var price = 0;
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var item = data_1[_i];
                    price += item.sale_price ? item.sale_price : 0;
                    _this.details.push({
                        bill_no: _this.purchaseRec.bill_no,
                        good_no: item
                    });
                }
                _this.purchaseRec.cost = price;
            }
        });
        alert.present();
    };
    PurchaseRecDetailPage.prototype.selectOption = function ($event) {
        this.details = [];
        for (var _i = 0, _a = this.purchaseOrderList; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.bill_no == this.purchaseRec.ref_bill_no) {
                this.purchaseRec.supplier_no = item.supplier_no;
                this.getDetailGoods(item.bill_no);
                break;
            }
        }
    };
    PurchaseRecDetailPage.prototype.getDetailGoods = function (bill_no) {
        var _this = this;
        if (!bill_no) {
            return;
        }
        this.sqlHelp.query("purchase_order_detail", "bill_no = '" + bill_no + "'").then(function (data) {
            if (data.res.rows.length > 0) {
                for (var _i = 0, _a = _this.util.sqliteToArrqy(data.res.rows); _i < _a.length; _i++) {
                    var item = _a[_i];
                    _this.details.push({
                        good_no: item.good_no,
                        price: item.price,
                        delivery_qty: 2
                    });
                }
            }
        });
    };
    return PurchaseRecDetailPage;
}());
PurchaseRecDetailPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-purchase-rec-detail',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\purchase-rec-detail\purchase-rec-detail.html"*/'<!--\n\n  Generated template for the PurchaseRecDetail page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title >采购收货单详情</ion-title>\n\n    <ion-buttons right>\n\n      <button ion-button (click)="editItem()" *ngIf="readonlyStatus">\n\n        <span ion-text color="primary" showWhen="ios">编辑</span>\n\n      </button>\n\n      <button ion-button (click)="dismiss()">\n\n        <span ion-text color="primary" showWhen="ios">关闭</span>\n\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-list>\n\n    <ion-item>\n\n      <ion-input type="text" [(ngModel)]="purchaseRec.bill_no"  readonly="true" placeholder="编号"></ion-input>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <ion-list>\n\n    <ion-item>\n\n      <ion-label>订单状态</ion-label>\n\n      <ion-select [(ngModel)]="purchaseRec.bill_status" *ngIf="readonlyStatus" disabled>\n\n        <ion-option value="10">制单</ion-option>\n\n        <ion-option value="20">审核</ion-option>\n\n        <ion-option value="30">部分入库</ion-option>\n\n        <ion-option value="50">完结</ion-option>\n\n        <ion-option value="99">关闭</ion-option>\n\n      </ion-select>\n\n      <ion-select [(ngModel)]="purchaseRec.bill_status" *ngIf="!readonlyStatus" disabled>\n\n        <ion-option value="10">制单</ion-option>\n\n        <ion-option value="20">审核</ion-option>\n\n        <ion-option value="30">部分入库</ion-option>\n\n        <ion-option value="50">完结</ion-option>\n\n        <ion-option value="99">关闭</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>收货日期</ion-label>\n\n      <ion-datetime displayFormat="YYYY MM DD"  [(ngModel)]="purchaseRec.create_time" *ngIf="readonlyStatus" disabled></ion-datetime>\n\n      <ion-datetime displayFormat="YYYY MM DD"  [(ngModel)]="purchaseRec.create_time" *ngIf="!readonlyStatus" ></ion-datetime>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>采购订单</ion-label>\n\n      <ion-input type="text" [(ngModel)]="purchaseRec.ref_bill_no"  *ngIf="readonlyStatus" readonly="true" ></ion-input>\n\n      <ion-select [(ngModel)]="purchaseRec.ref_bill_no"  *ngIf="!readonlyStatus"    (ngModelChange)="purchaseRec.ref_bill_no=$event;selectOption()">\n\n        <ion-option *ngFor="let pruchaseO of purchaseOrderList"  value="{{pruchaseO.bill_no}}">{{pruchaseO.bill_no}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>供应商</ion-label>\n\n      <ion-select [(ngModel)]="purchaseRec.supplier_no"    disabled >\n\n        <ion-option *ngFor="let supplier of supplierList"  value="{{supplier.supplier_no}}">{{supplier.supplier_name}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <ion-card>\n\n    <ion-card-header>\n\n      已购商品\n\n    </ion-card-header>\n\n    <ion-list>\n\n      <ion-item *ngFor="let item of details">\n\n        <div  item-left style="float:left">\n\n          <div>编号：{{item.good_no}}</div>\n\n          <div> 名称：{{item.good_name}}</div>\n\n        </div>\n\n      </ion-item>\n\n    </ion-list>\n\n  </ion-card>\n\n\n\n  <ion-item>\n\n    <ion-label>合计金额</ion-label>\n\n    <ion-input type="text" [(ngModel)]="purchaseRec.cost" readonly="true" ></ion-input>\n\n  </ion-item>\n\n\n\n  <button ion-button block (click)="save()" *ngIf="!readonlyStatus">Save</button>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\purchase-rec-detail\purchase-rec-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_util_service__["a" /* UtilService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__["a" /* SqlService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* AlertController */]])
], PurchaseRecDetailPage);

//# sourceMappingURL=purchase-rec-detail.js.map

/***/ })

});
//# sourceMappingURL=14.main.js.map