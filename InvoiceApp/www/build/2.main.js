webpackJsonp([2],{

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transfer_list__ = __webpack_require__(369);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransferListPageModule", function() { return TransferListPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TransferListPageModule = (function () {
    function TransferListPageModule() {
    }
    return TransferListPageModule;
}());
TransferListPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__transfer_list__["a" /* TransferListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__transfer_list__["a" /* TransferListPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__transfer_list__["a" /* TransferListPage */]
        ]
    })
], TransferListPageModule);

//# sourceMappingURL=transfer-list.module.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_stk_service__ = __webpack_require__(214);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransferListPage; });
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
  调拨单.
 wudefeng
 2017-5-11
*/
var TransferListPage = (function () {
    function TransferListPage(navCtrl, navParams, modalCtrl, sqlHelp, util, stkService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.sqlHelp = sqlHelp;
        this.util = util;
        this.stkService = stkService;
        this.items = [];
        this.searchKey = "";
    }
    TransferListPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    TransferListPage.prototype.getData = function (isFilter) {
        var _this = this;
        if (isFilter === void 0) { isFilter = false; }
        var sql = "select a.*,count(b.id) as itemCount,sum(b.qty*e.cost_price) as cost,\n                c.depot_name as out_store_name,d.depot_name as in_store_name \n             from bl_transfer a join bl_transfer_dtl b on a.bill_no=b.bill_no \n             join depot c on a.out_store_no = c.depot_no\n             join depot d on a.in_store_no = d.depot_no\n             join good e on b.good_no = e.good_no\n             where 1=1 ";
        if (isFilter && this.searchKey) {
            sql += " and (a.bill_no like '%?%' or b.good_no like '%?%' or c.depot_name like '%?%' or d.depot_name like '%?%' or e.good_name like '%?%')".replace(/\?/g, this.searchKey);
        }
        sql += "  group by a.bill_no";
        this.sqlHelp.getRowsBySql(sql).then(function (data) {
            _this.items = [].concat(data);
        });
    };
    TransferListPage.prototype.onSearch = function ($event) {
        var _this = this;
        this.inputTime = $event.timeStamp;
        setTimeout(function () {
            if ($event.timeStamp == _this.inputTime) {
                console.info("search...");
                _this.getData(true);
            }
        }, 500);
    };
    TransferListPage.prototype.addItem = function (obj) {
        this.navCtrl.push('TransferDetailPage', { item: obj, parentPage: this });
    };
    TransferListPage.prototype.deleteItem = function (obj) {
        var _this = this;
        this.util.showConfirm("确认删除？", "", function () {
            _this.sqlHelp.removeBill("bl_transfer", "bl_transfer_dtl", obj.bill_no).then(function (data) {
                _this.items.splice(_this.items.indexOf(obj), 1);
            });
        });
    };
    TransferListPage.prototype.audit = function (obj) {
        var _this = this;
        this.util.showConfirm("确认审核？", "", function () {
            _this.stkService.stkBiz(obj.bill_no, "1006").then(function (data) {
                if (data.result == "1") {
                    _this.util.showAlert(data.msg, "出错了");
                    return;
                }
                _this.getData();
            });
        });
    };
    return TransferListPage;
}());
TransferListPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-transfer-list',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\transfer-list\transfer-list.html"*/'<!--\n\n  调拨单.\n\n wudefeng\n\n 2017-5-11\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>调拨单</ion-title>\n\n    <ion-buttons end>\n\n    <!--   <button ion-button ion-only >\n\n        <ion-icon name="ios-funnel" outline></ion-icon>\n\n      </button>  -->\n\n      <button ion-button icon-only (click)="addItem()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-searchbar [(ngModel)]="searchKey" (ionInput)="onSearch($event)" placeholder="输入仓库、商品等关键字进行查询" (ionClear)="getData()">\n\n  </ion-searchbar>\n\n\n\n  <ion-list>\n\n    <ion-item-sliding *ngFor="let item of items">\n\n      <button ion-item tappable (click)="addItem(item)">  \n\n      <h3>{{item.out_store_name}} <ion-icon name="arrow-forward"></ion-icon> {{item.in_store_name}}</h3>  \n\n      <h3>{{item.bill_no}}</h3> \n\n      <h3>￥{{item.cost}}</h3>\n\n      <div item-right>\n\n        <button ion-button color="secondary" *ngIf="item.bill_status==\'10\'"  outline>制单</button>\n\n        <button ion-button color="energized" *ngIf="item.bill_status==\'20\'"  outline>审核</button>\n\n        <p>共 {{item.itemCount}} 项</p>\n\n        </div>\n\n    </button>\n\n      <ion-item-options *ngIf="item.bill_status==\'10\'">\n\n        <button ion-button  (click)="audit(item)">\n\n          <ion-icon name="lock"></ion-icon> \n\n          审核 \n\n       </button>\n\n        <button ion-button color="danger" (click)="deleteItem(item)">\n\n        <ion-icon name="trash"></ion-icon>\n\n               删除\n\n          </button>\n\n      </ion-item-options>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\transfer-list\transfer-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__["a" /* SqlService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_util_service__["a" /* UtilService */],
        __WEBPACK_IMPORTED_MODULE_4__providers_stk_service__["a" /* StkService */]])
], TransferListPage);

//# sourceMappingURL=transfer-list.js.map

/***/ })

});
//# sourceMappingURL=2.main.js.map