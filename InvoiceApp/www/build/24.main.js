webpackJsonp([24],{

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__choose_goods__ = __webpack_require__(347);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChooseGoodsPageModule", function() { return ChooseGoodsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChooseGoodsPageModule = (function () {
    function ChooseGoodsPageModule() {
    }
    return ChooseGoodsPageModule;
}());
ChooseGoodsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__choose_goods__["a" /* ChooseGoodsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__choose_goods__["a" /* ChooseGoodsPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__choose_goods__["a" /* ChooseGoodsPage */]
        ]
    })
], ChooseGoodsPageModule);

//# sourceMappingURL=choose-goods.module.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooseGoodsPage; });
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
  选择商品页面.
  wudefeng
  2017-05-11
*/
var ChooseGoodsPage = (function () {
    function ChooseGoodsPage(navCtrl, navParams, sqlHelp, modalCtrl, viewCtrl, util) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlHelp = sqlHelp;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.util = util;
        this.items = [];
    }
    ChooseGoodsPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    ChooseGoodsPage.prototype.getData = function () {
        var _this = this;
        this.sqlHelp.getRowsByTable('good').then(function (data) {
            _this.items = [].concat(data);
            var choosed = _this.navParams.get("choosed"), item;
            if (choosed) {
                var _loop_1 = function (obj) {
                    if (obj.qty && obj.good_no) {
                        item = _this.items.find(function (i) { return i.good_no == obj.good_no; });
                        if (item) {
                            item.input_qty = obj.qty;
                        }
                    }
                };
                for (var _i = 0, choosed_1 = choosed; _i < choosed_1.length; _i++) {
                    var obj = choosed_1[_i];
                    _loop_1(obj);
                }
            }
        });
    };
    ChooseGoodsPage.prototype.addItem = function () {
        var _this = this;
        var page = this.modalCtrl.create('GoodsEditPage');
        page.onDidDismiss(function () { _this.getData(); });
        page.present();
    };
    ChooseGoodsPage.prototype.changeQty = function (item, direct) {
        var qty = (Number(item.input_qty) || 0) + direct;
        if (qty >= 0) {
            item.input_qty = qty;
        }
    };
    ChooseGoodsPage.prototype.inputQty = function (item) {
        this.util.showPrompt('', '输入数量', [{ name: 'qty', placeholder: '请输入数量', type: 'number' }], function (data) {
            var qty = Number(data.qty);
            if (qty > 0) {
                item.input_qty = qty;
            }
            else {
                delete item.input_qty;
            }
        });
    };
    ChooseGoodsPage.prototype.getChooseItem = function () {
        return this.items.filter(function (item, index) {
            return item.input_qty > 0;
        });
    };
    ChooseGoodsPage.prototype.confirmChoose = function () {
        this.viewCtrl.dismiss(this.getChooseItem());
    };
    return ChooseGoodsPage;
}());
ChooseGoodsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-choose-goods',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\choose-goods\choose-goods.html"*/'<!--\n\n  选择商品页面.\n\n  wudefeng\n\n  2017-05-11\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>选择商品</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="addItem()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-searchbar placeholder="输入商品编，名称查询"></ion-searchbar>\n\n  <ion-list>\n\n    <ion-item *ngFor="let item of items">\n\n      <ion-thumbnail item-left>\n\n        <img [src]="item.img">\n\n      </ion-thumbnail>\n\n      <h3>产品编号：{{item.good_no}}</h3>\n\n      <h3>产品名称：{{item.good_name}}</h3>\n\n      <div item-right style="margin-right: -6px">\n\n        <button ion-button (click)="changeQty(item,-1)" style="margin-right:-6px" clear icon-only>\n\n               <ion-icon name="remove"></ion-icon>\n\n           </button>\n\n        <button ion-button (click)="inputQty(item)" outline style="min-width:35px">\n\n              {{item.input_qty}}\n\n            </button>\n\n        <button ion-button (click)="changeQty(item,1)" style="margin-left:-6px" clear icon-only>\n\n               <ion-icon name="add"></ion-icon>\n\n            </button>\n\n      </div>\n\n\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n</ion-content>\n\n<ion-footer>\n\n  <ion-item>\n\n    已选择:{{getChooseItem().length}}项\n\n    <button ion-button small item-right (click)="confirmChoose()">确认</button>\n\n  </ion-item>\n\n</ion-footer>'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\choose-goods\choose-goods.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__["a" /* SqlService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_util_service__["a" /* UtilService */]])
], ChooseGoodsPage);

//# sourceMappingURL=choose-goods.js.map

/***/ })

});
//# sourceMappingURL=24.main.js.map