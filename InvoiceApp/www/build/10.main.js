webpackJsonp([10],{

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stk_check__ = __webpack_require__(361);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StkCheckPageModule", function() { return StkCheckPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StkCheckPageModule = (function () {
    function StkCheckPageModule() {
    }
    return StkCheckPageModule;
}());
StkCheckPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__stk_check__["a" /* StkCheckPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__stk_check__["a" /* StkCheckPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__stk_check__["a" /* StkCheckPage */]
        ]
    })
], StkCheckPageModule);

//# sourceMappingURL=stk-check.module.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StkCheckPage; });
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
   盘点录入单
  wudefeng
  2017-05-12
*/
var StkCheckPage = (function () {
    function StkCheckPage(navCtrl, navParams, modalCtrl, sqlHelp) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.sqlHelp = sqlHelp;
        this.items = [];
        this.searchKey = "";
    }
    StkCheckPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    StkCheckPage.prototype.addItem = function (obj) {
        this.navCtrl.push('StkCheckInputPage', { item: obj, parentPage: this });
    };
    StkCheckPage.prototype.getData = function (isfilter) {
        var _this = this;
        if (isfilter === void 0) { isfilter = false; }
        var sql = "select a.bill_no,store_no, a.create_time,c.depot_name as store_name,a.bill_status,\n               sum((b.input_qty-b.stk_qty)*b.cost) as totalCost\n             from bl_stk_check a join bl_stk_check_dtl b on a.bill_no=b.bill_no\n             join depot c on a.store_no=c.depot_no\n             join good d on b.good_no = d.good_no";
        if (isfilter && this.searchKey) {
            var val = this.searchKey;
            sql += " and (a.bill_no like '%?%' or c.depot_name like '%?%' or d.good_no like '%?%' or d.good_name like '%?%')".replace(/\?/g, val);
        }
        sql += ' group by a.bill_no';
        this.sqlHelp.getRowsBySql(sql).then(function (rows) {
            _this.items = [].concat(rows);
        }).catch(function (err) {
            console.error(err.err);
        });
    };
    StkCheckPage.prototype.onSearch = function ($event) {
        var _this = this;
        this.inputTime = $event.timeStamp;
        setTimeout(function () {
            if ($event.timeStamp == _this.inputTime) {
                console.info("search...");
                _this.getData(true);
            }
        }, 500);
    };
    return StkCheckPage;
}());
StkCheckPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-stk-check',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\stk-check\stk-check.html"*/'<!--\n\n  盘点录入单清单.\n\n  wudefeng\n\n  2017-05-12\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>盘点单</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="addItem()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-searchbar [(ngModel)]="searchKey" (ionInput)="onSearch($event)" placeholder="输入仓库、商品等关键字进行查询" (ionClear)="getData()">\n\n  </ion-searchbar>\n\n   <ion-list>\n\n    <button ion-item tappable *ngFor="let item of items" (click)="addItem(item)">    \n\n      <div>{{item.store_name}}</div>\n\n      <div>{{item.bill_no}} </div>    \n\n      \n\n      <div item-right text-right>\n\n        <button ion-button color="secondary" *ngIf="item.bill_status==\'10\'" outline>制单</button>\n\n        <button ion-button color="energized" *ngIf="item.bill_status==\'20\'" outline>审核</button>\n\n        <p>￥ {{item.totalCost}}</p>\n\n      </div>    \n\n       \n\n    </button>\n\n  </ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\stk-check\stk-check.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__["a" /* SqlService */]])
], StkCheckPage);

//# sourceMappingURL=stk-check.js.map

/***/ })

});
//# sourceMappingURL=10.main.js.map