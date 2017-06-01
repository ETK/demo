webpackJsonp([12],{

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stk_add__ = __webpack_require__(359);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StkAddPageModule", function() { return StkAddPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StkAddPageModule = (function () {
    function StkAddPageModule() {
    }
    return StkAddPageModule;
}());
StkAddPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__stk_add__["a" /* StkAddPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__stk_add__["a" /* StkAddPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__stk_add__["a" /* StkAddPage */]
        ]
    })
], StkAddPageModule);

//# sourceMappingURL=stk-add.module.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StkAddPage; });
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
 Generated class for the StkAdd page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var StkAddPage = (function () {
    function StkAddPage(navCtrl, navParams, viewCtrl, sqlService, utilService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.sqlService = sqlService;
        this.utilService = utilService;
        this.tableName = "stk_in_out_dtl";
        this.item = {};
        this.isNew = true;
    }
    StkAddPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StkAddPage');
        var obj = this.navParams.get('stk');
        if (obj) {
            this.item = obj;
            this.isNew = false;
        }
    };
    StkAddPage.prototype.save = function () {
        var _this = this;
        var judage = "select * from stk where good_no='" + this.item.good_no + "' and cell_no='" + this.item.cell_no + "'";
        console.info(judage);
        this.sqlService.queryBySql(judage, "").then(function (data) {
            //TODO-判断是否有相关库存
            var goOn = true;
            var stkBean;
            if (_this.item.in_out_flag == 1) {
                if (data.res.rows.length <= 0 || data.res.rows.item(0).qty < _this.item.qty) {
                    goOn = false;
                }
                else {
                    stkBean = data.res.rows.item(0);
                    stkBean.qty = _this.utilService.floatSub(stkBean.qty, _this.item.qty);
                }
            }
            else {
                if (data.res.rows.length <= 0) {
                    stkBean = {
                        "good_no": _this.item.good_no,
                        "cell_no": _this.item.cell_no,
                        "qty": _this.item.qty
                    };
                }
                else {
                    stkBean = data.res.rows.item(0);
                    stkBean.qty = _this.utilService.floatAdd(stkBean.qty, _this.item.qty);
                }
            }
            //next action--
            if (goOn) {
                _this.sqlService.save(_this.tableName, _this.item).then(function (rec) {
                    //TODO-新增进出明细后，更新库存表信息；
                    //1、库存表没有相关记录，则新增；
                    //2、进出标识为0，则库存数量累加，否则累减
                    _this.sqlService.save("stk", stkBean).then(function (res) {
                        console.info(rec);
                        _this.viewCtrl.dismiss(true);
                    }, function (err) {
                        _this.utilService.showAlert("提示", err, function () { });
                    });
                }, function (err) {
                    _this.utilService.showAlert("提示", err, null);
                });
            }
            else {
                _this.utilService.showToast("该商品在当前储位没有足够库存，不允许做出仓操作！");
            }
        }, function (err) {
            _this.utilService.showToast(err);
        });
    };
    return StkAddPage;
}());
StkAddPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-stk-add',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\stk-add\stk-add.html"*/'<!--\n\n  Generated template for the StkAdd page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>新增库存明细</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list>\n\n    <ion-item>\n\n      <ion-label>商品编号</ion-label>\n\n      <ion-input type="text" placeholder="编号" [(ngModel)]="item.good_no"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>仓库</ion-label>\n\n      <ion-input type="text" placeholder="仓库" [(ngModel)]="item.store_no"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>储位</ion-label>\n\n      <ion-input type="text" placeholder="储位" [(ngModel)]="item.cell_no"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>进/出</ion-label>\n\n      <ion-input type="text" placeholder="进/出" [(ngModel)]="item.in_out_flag"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>数量</ion-label>\n\n      <ion-input type="number" placeholder="数量" [(ngModel)]="item.qty"></ion-input>\n\n    </ion-item>\n\n  </ion-list>\n\n  <button ion-button block (click)="save()">Save</button>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\stk-add\stk-add.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__["a" /* SqlService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_util_service__["a" /* UtilService */]])
], StkAddPage);

//# sourceMappingURL=stk-add.js.map

/***/ })

});
//# sourceMappingURL=12.main.js.map