webpackJsonp([13],{

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__purchase_rec_list__ = __webpack_require__(358);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseRecListPageModule", function() { return PurchaseRecListPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PurchaseRecListPageModule = (function () {
    function PurchaseRecListPageModule() {
    }
    return PurchaseRecListPageModule;
}());
PurchaseRecListPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__purchase_rec_list__["a" /* PurchaseRecListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__purchase_rec_list__["a" /* PurchaseRecListPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__purchase_rec_list__["a" /* PurchaseRecListPage */]
        ]
    })
], PurchaseRecListPageModule);

//# sourceMappingURL=purchase-rec-list.module.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PurchaseRecListPage; });
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
  Generated class for the PurchaseRecList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var PurchaseRecListPage = (function () {
    function PurchaseRecListPage(navCtrl, util, navParams, _ngZone, sqlHelp, modalCtrl) {
        this.navCtrl = navCtrl;
        this.util = util;
        this.navParams = navParams;
        this._ngZone = _ngZone;
        this.sqlHelp = sqlHelp;
        this.modalCtrl = modalCtrl;
        this.operation = 'add';
        this.searchKey = "";
        this.tableName = "purchase_rec";
        this.selectItems = [];
        this.placeholder = '请输入关键字';
        this.myInput = '';
    }
    PurchaseRecListPage.prototype.ionViewDidLoad = function () {
        //刷新
        this.getData();
    };
    PurchaseRecListPage.prototype.getData = function () {
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
    PurchaseRecListPage.prototype.addItem = function () {
        var _this = this;
        var addModal = this.modalCtrl.create('PurchaseRecDetailPage', { operation: false });
        addModal.onDidDismiss(function (item) {
            if (item) {
                _this.getData();
            }
        });
        addModal.present();
    };
    PurchaseRecListPage.prototype.editItem = function (item) {
        this.navCtrl.push('PurchaseRecDetailPage', { detail: item, operation: true });
    };
    // itemDetail(item){
    //   this.operation = 'detail';
    //   this.navCtrl.push(PurchaseRecDetailPage, {detail:{supplier_no:'A0001',supplier_name:'明细'},operation:this.operation});
    // }
    PurchaseRecListPage.prototype.deleteItem = function (item) {
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
    PurchaseRecListPage.prototype.deleteAllItem = function () {
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
    PurchaseRecListPage.prototype.onInput = function () {
        var _this = this;
        var array = [];
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var data = _a[_i];
            if (data.bill_no.indexOf(this.myInput) >= 0) {
                array.push(data);
            }
        }
        //console.log(array);
        this._ngZone.run(function () {
            _this.items = array;
        });
    };
    PurchaseRecListPage.prototype.insertUserToArray = function (item, enent) {
        if (enent.checked) {
            this.selectItems.push(item.bill_no);
        }
        else {
            this.selectItems.splice(this.selectItems.indexOf(item.bill_no), 1);
        }
    };
    PurchaseRecListPage.prototype.onClear = function () {
        this.items = this.totalData;
    };
    PurchaseRecListPage.prototype.fastAddItem = function () {
    };
    return PurchaseRecListPage;
}());
PurchaseRecListPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-purchase-rec-list',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\purchase-rec-list\purchase-rec-list.html"*/'<!--\n\n  Generated template for the PurchaseRecList page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>采购收货单</ion-title>\n\n    <ion-buttons end>\n\n\n\n      <button tappable ion-button icon-only (click)="fastAddItem()">\n\n        <ion-icon name="add-circle"></ion-icon>\n\n      </button>\n\n      <button tappable ion-button icon-only (click)="addItem()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n      <button tappable ion-button icon-only (click)="deleteAllItem()">\n\n        <ion-icon name="remove"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n\n\n<ion-content padding>\n\n  <ion-searchbar\n\n    [(ngModel)]="myInput"\n\n    (ionInput)="onInput()"\n\n    [placeholder]="placeholder"\n\n    (ionClear)="onClear()"\n\n  >\n\n  </ion-searchbar>\n\n\n\n  <ion-list>\n\n    <ion-item-sliding *ngFor="let item of items" >\n\n      <ion-item tappable  >\n\n        <ion-checkbox color="dark" value="item.bill_no" (ionChange)="insertUserToArray(item,$event)"></ion-checkbox>\n\n\n\n        <ion-card item-left >\n\n          <ion-card-content>\n\n            <div (click)="editItem(item)" item-left style="float:left">\n\n              <div>{{item.supplier_no}}</div>\n\n              <div> {{item.bill_no}}</div>\n\n            </div>\n\n            <button ion-button (click)="editItem(item)" small item-right style="float:right">\n\n              <ion-icon name="edit"></ion-icon>\n\n              明细\n\n            </button>\n\n          </ion-card-content>\n\n        </ion-card>\n\n\n\n\n\n      </ion-item>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\purchase-rec-list\purchase-rec-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_util_service__["a" /* UtilService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__["a" /* SqlService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
], PurchaseRecListPage);

//# sourceMappingURL=purchase-rec-list.js.map

/***/ })

});
//# sourceMappingURL=13.main.js.map