webpackJsonp([15],{

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__purchase_order_list__ = __webpack_require__(356);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseOrderListPageModule", function() { return PurchaseOrderListPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PurchaseOrderListPageModule = (function () {
    function PurchaseOrderListPageModule() {
    }
    return PurchaseOrderListPageModule;
}());
PurchaseOrderListPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__purchase_order_list__["a" /* PurchaseOrderListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__purchase_order_list__["a" /* PurchaseOrderListPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__purchase_order_list__["a" /* PurchaseOrderListPage */]
        ]
    })
], PurchaseOrderListPageModule);

//# sourceMappingURL=purchase-order-list.module.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_supplier_service__ = __webpack_require__(215);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PurchaseOrderListPage; });
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
  Generated class for the PurchaseOrderList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var PurchaseOrderListPage = (function () {
    function PurchaseOrderListPage(navCtrl, util, navParams, _ngZone, sqlHelp, custService, modalCtrl) {
        this.navCtrl = navCtrl;
        this.util = util;
        this.navParams = navParams;
        this._ngZone = _ngZone;
        this.sqlHelp = sqlHelp;
        this.custService = custService;
        this.modalCtrl = modalCtrl;
        this.operation = 'add';
        this.searchKey = "";
        this.tableName = "purchase_order";
        this.selectItems = [];
        this.placeholder = '请输入关键字';
        this.myInput = '';
    }
    PurchaseOrderListPage.prototype.ionViewDidLoad = function () {
        //刷新
        this.getData();
    };
    PurchaseOrderListPage.prototype.getData = function () {
        var _this = this;
        this.items = [];
        var condition = "";
        if (this.searchKey) {
            condition = "bill_no like '%" + condition + "%'";
        }
        this.sqlHelp.query(this.tableName, condition).then(function (data) {
            if (data.res.rows.length > 0) {
                _this.totalData = _this.util.sqliteToArrqy(data.res.rows);
                _this.items = _this.totalData;
            }
        });
    };
    PurchaseOrderListPage.prototype.addItem = function () {
        var _this = this;
        var addModal = this.modalCtrl.create('PurchaseOrderDetailPage', { operation: false });
        addModal.onDidDismiss(function (item) {
            if (item) {
                _this.getData();
            }
        });
        addModal.present();
    };
    PurchaseOrderListPage.prototype.editItem = function (item) {
        this.navCtrl.push('PurchaseOrderDetailPage', { detail: item, operation: true });
    };
    PurchaseOrderListPage.prototype.itemDetail = function (item) {
        this.operation = 'detail';
        this.navCtrl.push('PurchaseOrderDetailPage', { detail: { supplier_no: 'A0001', supplier_name: '明细' }, operation: this.operation });
    };
    PurchaseOrderListPage.prototype.deleteItem = function (item) {
        var _this = this;
        this.util.showConfirm('提示', '确定要删除此条数据?', function () {
            //delete到数据库
            var condition = "";
            condition = "bill_no = '" + item.bill_no + "'";
            _this.sqlHelp.remove(_this.tableName, condition).then(function (data) {
                _this.getData();
            });
        });
    };
    PurchaseOrderListPage.prototype.deleteAllItem = function () {
        var _this = this;
        if (this.selectItems.length <= 0) {
            this.util.showAlert("请选中要删除的数据");
            return false;
        }
        this.util.showConfirm('提示', '确定要删除选中的数据?', function () {
            //delete到数据库
            var condition = "bill_no in (";
            for (var _i = 0, _a = _this.selectItems; _i < _a.length; _i++) {
                var data = _a[_i];
                condition += " '" + data + "',";
            }
            condition = condition.substring(0, condition.length - 1);
            condition += ") ";
            _this.sqlHelp.remove(_this.tableName, condition).then(function (data) {
                _this.selectItems = [];
                _this.getData();
            });
        });
    };
    PurchaseOrderListPage.prototype.onInput = function () {
        var _this = this;
        var array = [];
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var data = _a[_i];
            if (data.supplier_name.indexOf(this.myInput) >= 0 || data.supplier_no.indexOf(this.myInput) >= 0) {
                array.push(data);
            }
        }
        //console.log(array);
        this._ngZone.run(function () {
            _this.items = array;
        });
    };
    PurchaseOrderListPage.prototype.insertUserToArray = function (item, enent) {
        if (enent.checked) {
            this.selectItems.push(item.bill_no);
        }
        else {
            this.selectItems.splice(this.selectItems.indexOf(item.bill_no), 1);
        }
    };
    PurchaseOrderListPage.prototype.onClear = function () {
        this.items = this.totalData;
    };
    return PurchaseOrderListPage;
}());
PurchaseOrderListPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-purchase-order-list',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\purchase-order-list\purchase-order-list.html"*/'<!--\n\n  Generated template for the PurchaseOrderList page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>采购订单</ion-title>\n\n    <ion-buttons end>\n\n      <button tappable ion-button icon-only (click)="addItem()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n      <button tappable ion-button icon-only (click)="deleteAllItem()">\n\n        <ion-icon name="remove"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-searchbar\n\n    [(ngModel)]="myInput"\n\n    (ionInput)="onInput()"\n\n    [placeholder]="placeholder"\n\n    (ionClear)="onClear()"\n\n  >\n\n  </ion-searchbar>\n\n\n\n  <ion-list>\n\n    <ion-item-sliding *ngFor="let item of items" >\n\n      <ion-item tappable  >\n\n        <ion-checkbox color="dark" value="item.supplier_no" (ionChange)="insertUserToArray(item,$event)"></ion-checkbox>\n\n\n\n        <ion-card item-left >\n\n          <ion-card-content>\n\n            <div (click)="editItem(item)" item-left style="float:left">\n\n              <div>{{item.supplier_no}}</div>\n\n              <div> {{item.bill_no}}</div>\n\n            </div>\n\n            <button ion-button (click)="editItem(item)" small item-right style="float:right">\n\n              <ion-icon name="edit"></ion-icon>\n\n              明细\n\n            </button>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n\n\n      </ion-item>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\purchase-order-list\purchase-order-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_util_service__["a" /* UtilService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__["a" /* SqlService */], __WEBPACK_IMPORTED_MODULE_4__providers_supplier_service__["a" /* SupplierService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
], PurchaseOrderListPage);

//# sourceMappingURL=purchase-order-list.js.map

/***/ })

});
//# sourceMappingURL=15.main.js.map