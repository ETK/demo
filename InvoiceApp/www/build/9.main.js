webpackJsonp([9],{

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stk_list__ = __webpack_require__(362);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StkListPageModule", function() { return StkListPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StkListPageModule = (function () {
    function StkListPageModule() {
    }
    return StkListPageModule;
}());
StkListPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__stk_list__["a" /* StkListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__stk_list__["a" /* StkListPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__stk_list__["a" /* StkListPage */]
        ]
    })
], StkListPageModule);

//# sourceMappingURL=stk-list.module.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StkListPage; });
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
 Generated class for the StkList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var StkListPage = (function () {
    function StkListPage(navCtrl, navParams, modalCtrl, sqlService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.sqlService = sqlService;
        this.stkList = [];
        this.searchKey = "";
    }
    StkListPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    StkListPage.prototype.getData = function (isFilter) {
        var _this = this;
        if (isFilter === void 0) { isFilter = false; }
        var sqlStr = "select a.*,b.good_name,depot_name as store_name \n                  from stk a join good b on a.good_no=b.good_no\n                  join depot c on a.store_no=c.depot_no  \n                  where 1=1";
        if (isFilter && this.searchKey.length > 0) {
            var key = this.searchKey.replace(/\'/g, "''");
            sqlStr += " and (a.good_no like '%?%' or b.good_name like '%?%' or c.depot_name like '%?%')".replace(/\?/g, key);
        }
        this.sqlService.getRowsBySql(sqlStr).then(function (data) {
            _this.stkList = [].concat(data);
        });
    };
    StkListPage.prototype.onSearch = function (event) {
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
    return StkListPage;
}());
StkListPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-stk-list',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\stk-list\stk-list.html"*/'<!--\n\n  Generated template for the StkList page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>库存管理</ion-title>   \n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-searchbar  placeholder="输入仓库、商品编号、名称进行查询" [(ngModel)]="searchKey" (keyup)="onSearch($event)"(ionClear)="getData()"></ion-searchbar>\n\n  <table class="table">\n\n    <tr>\n\n      <th>商品编码</th>\n\n      <th>商品名称</th>\n\n      <th>仓库</th>\n\n      <th>数量</th>\n\n    </tr>\n\n    <tr *ngFor="let stk of stkList">\n\n      <td>{{stk.good_no}}</td>\n\n      <td>{{stk.good_name}}</td>\n\n      <td>{{stk.store_name}}</td>\n\n      <td>{{stk.qty}}</td>\n\n    </tr>\n\n  </table>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\stk-list\stk-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__["a" /* SqlService */]])
], StkListPage);

//# sourceMappingURL=stk-list.js.map

/***/ })

});
//# sourceMappingURL=9.main.js.map