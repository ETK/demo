webpackJsonp([8],{

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stk_log_list__ = __webpack_require__(363);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StkLogListPageModule", function() { return StkLogListPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StkLogListPageModule = (function () {
    function StkLogListPageModule() {
    }
    return StkLogListPageModule;
}());
StkLogListPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__stk_log_list__["a" /* StkLogListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__stk_log_list__["a" /* StkLogListPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__stk_log_list__["a" /* StkLogListPage */]
        ]
    })
], StkLogListPageModule);

//# sourceMappingURL=stk-log-list.module.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StkLogListPage; });
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
  进出仓明细表
  wudefeng
  2017-05-19
*/
var StkLogListPage = (function () {
    function StkLogListPage(navCtrl, navParams, sqlHelp) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlHelp = sqlHelp;
        this.items = [];
        this.searchKey = "";
    }
    StkLogListPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    StkLogListPage.prototype.getData = function (isSearch) {
        var _this = this;
        if (isSearch === void 0) { isSearch = false; }
        var sql = "select a.*,b.depot_name as store_name,c.good_name \n               from stk_in_out_dtl a \n               join depot b on a.store_no = b.depot_no\n               join good c on a.good_no=c.good_no\n               where 1=1 ";
        if (isSearch && this.searchKey) {
            var val = this.searchKey;
            sql += " and (a.good_no like '%?%' or c.good_name like '%?%' \n               or b.depot_name like '%?%' or a.bill_no like '%?%')".replace(/\?/gm, val);
        }
        this.sqlHelp.getRowsBySql(sql).then(function (rows) {
            _this.items = [].concat(rows);
        });
    };
    StkLogListPage.prototype.onSearch = function (event) {
        var _this = this;
        if (this.searchKey.length < 1)
            return;
        this.inputTime = event.timeStamp;
        setTimeout(function () {
            if (event.timeStamp == _this.inputTime) {
                console.info("search...");
                _this.getData(true);
            }
        }, 500);
    };
    return StkLogListPage;
}());
StkLogListPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-stk-log-list',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\stk-log-list\stk-log-list.html"*/'<!--\n\n  进出仓明细表\n\n  wudefeng\n\n  2017-05-19\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>进出仓明细表</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content scrollbar-x="true">\n\n\n\n<ion-searchbar placeholder="输入仓库、商品编号、名称进行查询" [(ngModel)]="searchKey" (keyup)="onSearch($event)" (ionClear)="getData()">\n\n \n\n</ion-searchbar>\n\n\n\n<div style="overflow:scroll;width: 100%">\n\n  <table class="table">\n\n    <thead>\n\n    <tr>\n\n      <th>商品编码</th>\n\n      <th>商品名称</th>\n\n      <th>仓库</th>\n\n      <th>数量</th>\n\n      <th>业务单据号</th>\n\n      <th>进/出仓</th>\n\n      <th>操作人</th>\n\n      <th>操作时间</th>\n\n    </tr>\n\n    </thead>\n\n    <tbody>\n\n    <tr *ngFor="let obj of items">\n\n      <td>{{obj.good_no}}</td>\n\n      <td>{{obj.good_name}}</td>\n\n      <td>{{obj.store_name}}</td>\n\n      <td>{{obj.qty}}</td>\n\n      <td>{{obj.bill_no}}</td>\n\n      <td>{{obj.in_out_flag=="I"?"进仓":"出仓"}}</td>\n\n      <td>{{obj.creator}}</td>\n\n      <td>{{obj.create_time}}</td>\n\n    </tr>\n\n    </tbody>\n\n  </table>\n\n</div>\n\n</ion-content>'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\stk-log-list\stk-log-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__["a" /* SqlService */]])
], StkLogListPage);

//# sourceMappingURL=stk-log-list.js.map

/***/ })

});
//# sourceMappingURL=8.main.js.map