webpackJsonp([3],{

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transfer_tool__ = __webpack_require__(368);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransferToolPageModule", function() { return TransferToolPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TransferToolPageModule = (function () {
    function TransferToolPageModule() {
    }
    return TransferToolPageModule;
}());
TransferToolPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__transfer_tool__["a" /* TransferToolPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__transfer_tool__["a" /* TransferToolPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__transfer_tool__["a" /* TransferToolPage */]
        ]
    })
], TransferToolPageModule);

//# sourceMappingURL=transfer-tool.module.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransferToolPage; });
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
  调拨单明细页面弹出工具条
  wudefeng
  2017-5-11
*/
var TransferToolPage = (function () {
    function TransferToolPage(navParams, viewCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    TransferToolPage.prototype.ngOnInit = function () {
        if (this.navParams.data) {
            this.parentPage = this.navParams.data.parentPage;
        }
    };
    TransferToolPage.prototype.exit = function (isChange) {
        if (isChange === void 0) { isChange = false; }
        this.viewCtrl.dismiss();
        this.parentPage.exit(isChange);
    };
    TransferToolPage.prototype.remove = function () {
        var _this = this;
        this.parentPage.util.showConfirm("确认删除？", "", function () {
            _this.parentPage.sqlHelp.removeBill("bl_transfer", "bl_transfer_dtl", _this.parentPage.item.bill_no).then(function (data) {
                _this.parentPage.exit(true);
            });
            _this.viewCtrl.dismiss();
        });
    };
    TransferToolPage.prototype.audit = function () {
        var _this = this;
        this.parentPage.util.showConfirm("确认审核？", "", function () {
            _this.parentPage.stkService.stkBiz(_this.parentPage.item.bill_no, "1006").then(function (data) {
                if (data.result == "1") {
                    _this.parentPage.util.showAlert(data.msg, "出错了");
                    return;
                }
                _this.exit(true);
            });
        });
    };
    return TransferToolPage;
}());
TransferToolPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-transfer-tool',
        template: "\n    <ion-list>\n    <button ion-item tappable  (click)=\"remove()\" detail-none>\n          <ion-icon name='trash' ></ion-icon> \n          \u5220\u9664 \n     </button>\n     <button ion-item tappable  (click)=\"audit()\" detail-none >\n          <ion-icon name=\"lock\"></ion-icon> \n          \u5BA1\u6838 \n     </button>     \n    </ion-list>\n  "
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]])
], TransferToolPage);

//# sourceMappingURL=transfer-tool.js.map

/***/ })

});
//# sourceMappingURL=3.main.js.map