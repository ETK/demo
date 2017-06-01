webpackJsonp([4],{

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transfer_goods__ = __webpack_require__(367);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransferGoodsPageModule", function() { return TransferGoodsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TransferGoodsPageModule = (function () {
    function TransferGoodsPageModule() {
    }
    return TransferGoodsPageModule;
}());
TransferGoodsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__transfer_goods__["a" /* TransferGoodsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__transfer_goods__["a" /* TransferGoodsPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__transfer_goods__["a" /* TransferGoodsPage */]
        ]
    })
], TransferGoodsPageModule);

//# sourceMappingURL=transfer-goods.module.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransferGoodsPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TransferGoodsPage = (function () {
    function TransferGoodsPage(navCtrl, navParams, viewCtrl, sqlHelp, util) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.sqlHelp = sqlHelp;
        this.util = util;
        this.items = [];
    }
    TransferGoodsPage.prototype.ngOnInit = function () {
        if (this.navParams.get("parentPage")) {
            this.parentPage = this.navParams.data.parentPage;
            this.getData();
        }
    };
    TransferGoodsPage.prototype.getData = function (value) {
        var _this = this;
        if (value === void 0) { value = ""; }
        var sql = 'select a.*,b.qty from good a join stk b on a.good_no=b.good_no where b.store_no=?';
        var param = [this.parentPage.item.out_store_no];
        if (value) {
            sql += " and (a.good_no like '%?%' or a.good_name like '%?%')".replace(/\?/g, value);
        }
        this.sqlHelp.getRowsBySql(sql, param).then(function (rows) {
            _this.items = [].concat(rows);
            var item;
            var _loop_1 = function (obj) {
                item = _this.items.find(function (i) { return i.good_no == obj.good_no; });
                if (item) {
                    item.input_qty = obj.qty;
                }
            };
            for (var _i = 0, _a = _this.parentPage.goodsList; _i < _a.length; _i++) {
                var obj = _a[_i];
                _loop_1(obj);
            }
        });
    };
    TransferGoodsPage.prototype.search = function (ev) {
        var val = ev.target.value;
        this.getData(val);
    };
    TransferGoodsPage.prototype.confirmChoose = function () {
        var inputArr = [];
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.input_qty) {
                inputArr.push({
                    bill_no: this.parentPage.item.bill_no,
                    good_no: item.good_no,
                    qty: item.input_qty,
                    cost_price: item.cost_price
                });
            }
        }
        this.parentPage.goodsList = [].concat(inputArr);
        this.navCtrl.pop();
    };
    TransferGoodsPage.prototype.inputQty = function (obj) {
        var _this = this;
        this.util.showPrompt('', '输入调拨数量', [{ name: 'qty', placeholder: '请输入调拨数量', type: 'number', value: obj.input_qty || '' }], function (data) {
            if (data.qty == "") {
                _this.util.showAlert("请输入数量");
                return false;
            }
            if (Number(data.qty) > 0) {
                obj.input_qty = data.qty;
            }
        });
    };
    TransferGoodsPage.prototype.changeQty = function (item, dir) {
        var qty = (Number(item.input_qty) || 0) + dir;
        if (qty >= 0) {
            item.input_qty = qty;
        }
    };
    TransferGoodsPage.prototype.getCount = function () {
        var count = 0;
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.input_qty) {
                count++;
            }
        }
        return count;
    };
    return TransferGoodsPage;
}());
TransferGoodsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        template: "\n   <ion-header>\n\n  <ion-navbar>\n    <ion-title>\u9009\u62E9\u5546\u54C1</ion-title>    \n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <ion-searchbar placeholder=\"\u8F93\u5165\u5546\u54C1\u7F16\uFF0C\u540D\u79F0\u67E5\u8BE2\" (ionInput)=\"search($event)\"></ion-searchbar>\n  <ion-list>\n    <ion-item *ngFor=\"let item of items\">\n      <ion-thumbnail item-left>\n        <img [src]=\"item.img\">\n      </ion-thumbnail>\n      <h3>\u4EA7\u54C1\u7F16\u53F7\uFF1A{{item.good_no}}</h3>\n      <h3>\u4EA7\u54C1\u540D\u79F0\uFF1A{{item.good_name}}</h3>\n      <h3>\u5F53\u524D\u5E93\u5B58\uFF1A{{item.qty}}</h3>\n\n       <div item-right style=\"margin-right: -6px\">\n              <button ion-button (click)=\"changeQty(item,-1)\" style=\"margin-right:-6px\" clear icon-only >\n               <ion-icon name=\"remove\"></ion-icon>\n           </button>\n              <button ion-button (click)=\"inputQty(item)\" style=\"min-width:35px\" outline>\n              {{item.input_qty}}\n            </button>\n              <button ion-button (click)=\"changeQty(item,1)\" style=\"margin-left:-6px\" bold clear icon-only >\n               <ion-icon name=\"add\"></ion-icon>\n            </button>\n            </div>\n\n    </ion-item>\n  </ion-list>  \n</ion-content>\n<ion-footer>\n  <ion-item color=\"light\">\n     \u5DF2\u9009\u62E9:{{getCount()}}\u9879\n     <button ion-button  item-right (click)=\"confirmChoose()\">\u786E\u8BA4</button>\n  </ion-item>\n</ion-footer>   \n  "
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__["a" /* SqlService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_util_service__["a" /* UtilService */]])
], TransferGoodsPage);

//# sourceMappingURL=transfer-goods.js.map

/***/ })

});
//# sourceMappingURL=4.main.js.map