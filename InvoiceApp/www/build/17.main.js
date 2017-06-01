webpackJsonp([17],{

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__goods_list__ = __webpack_require__(354);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoodsListPageModule", function() { return GoodsListPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GoodsListPageModule = (function () {
    function GoodsListPageModule() {
    }
    return GoodsListPageModule;
}());
GoodsListPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__goods_list__["a" /* GoodsListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__goods_list__["a" /* GoodsListPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__goods_list__["a" /* GoodsListPage */]
        ]
    })
], GoodsListPageModule);

//# sourceMappingURL=goods-list.module.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoodsListPage; });
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
 Generated class for the GoodsList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var GoodsListPage = (function () {
    function GoodsListPage(navCtrl, util, sqlService) {
        this.navCtrl = navCtrl;
        this.util = util;
        this.sqlService = sqlService;
        this.placeholder = "请输入关键字";
        this.myInput = "";
    }
    GoodsListPage.prototype.ionViewWillEnter = function () {
        //刷新界面
        this.getData();
    };
    GoodsListPage.prototype.getData = function () {
        var _this = this;
        this.sqlService.query('good').then(function (data) {
            _this.totalData = _this.util.sqliteToArrqy(data.res.rows);
            _this.items = _this.totalData;
        }).catch(function (err) {
            console.error(err);
        });
    };
    GoodsListPage.prototype.editItem = function (item) {
        this.navCtrl.push('GoodsEditPage', { item: item });
    };
    GoodsListPage.prototype.addItem = function () {
        this.navCtrl.push('GoodsEditPage');
    };
    GoodsListPage.prototype.deleteItem = function (item) {
        var _this = this;
        this.util.showConfirm('确定要删除此条数据?', '提示', function () {
            var condition = "id='" + item.id + "'";
            _this.sqlService.remove('good', condition).then(function () {
                _this.getData();
            }).catch(function (err) {
                console.error(err);
            });
        });
    };
    GoodsListPage.prototype.onInput = function () {
        var _this = this;
        var array = [];
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var data = _a[_i];
            if (data.good_name.indexOf(this.myInput) >= 0 || data.good_no.indexOf(this.myInput) >= 0) {
                array.push(data);
            }
        }
        //console.log(array);
        this.util.refreshUI(function () {
            _this.items = array;
        });
    };
    GoodsListPage.prototype.onClear = function () {
        this.items = this.totalData;
    };
    return GoodsListPage;
}());
GoodsListPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-goods-list',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\goods-list\goods-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      商品管理\n\n    </ion-title>\n\n    <ion-buttons end>\n\n      <button tappable ion-button icon-only (click)="addItem()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-searchbar\n\n    [(ngModel)]="myInput"\n\n    (ionInput)="onInput()"\n\n    [placeholder]="placeholder"\n\n    (ionClear)="onClear()"\n\n  >\n\n  </ion-searchbar>\n\n\n\n  <ion-list>\n\n    <ion-item-sliding *ngFor="let item of items" (press)="deleteItem(item)">\n\n      <ion-item tappable (click)="editItem(item)" >\n\n        <ion-thumbnail  item-left>\n\n          <img src="{{item.img}}">\n\n        </ion-thumbnail>\n\n\n\n        <div item-left>\n\n          <div>商品编号：{{item.good_no}}</div>\n\n          <div> 商品名称：{{item.good_name}}</div>\n\n        </div>\n\n\n\n      </ion-item>\n\n      <ion-item-options side="right">\n\n        <button ion-button (click)="deleteItem(item)">\n\n          <ion-icon name="trash"></ion-icon>\n\n          删除\n\n        </button>\n\n      </ion-item-options>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\goods-list\goods-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_util_service__["a" /* UtilService */], __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__["a" /* SqlService */]])
], GoodsListPage);

//# sourceMappingURL=goods-list.js.map

/***/ })

});
//# sourceMappingURL=17.main.js.map