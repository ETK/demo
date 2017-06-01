webpackJsonp([28],{

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__about_us__ = __webpack_require__(343);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutUsPageModule", function() { return AboutUsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AboutUsPageModule = (function () {
    function AboutUsPageModule() {
    }
    return AboutUsPageModule;
}());
AboutUsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__about_us__["a" /* AboutUsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__about_us__["a" /* AboutUsPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__about_us__["a" /* AboutUsPage */]
        ]
    })
], AboutUsPageModule);

//# sourceMappingURL=about-us.module.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutUsPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AboutUsPage = (function () {
    function AboutUsPage(navCtrl, sqlService, utilService, navParams) {
        this.navCtrl = navCtrl;
        this.sqlService = sqlService;
        this.utilService = utilService;
        this.navParams = navParams;
        this.app = {};
        this.company = {};
    }
    AboutUsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var versionNumber;
        var envir;
        if (this.utilService.getPlatform() == 'pc') {
            versionNumber = '0.0.1';
            envir = '测试环境';
        }
        else {
            this.utilService.getVersionNumber().then(function (result) {
                _this.app = {
                    versionNumber: result,
                    envir: '测试环境'
                };
            });
        }
        this.company = {
            phone: '18503078587',
            qq: '3033389165',
            addr: '广东省深圳市龙华新区华宁西路97号'
        };
        //tencent://message/?uin=3033389165&site=qq&menu=yes
        this.hrefUrl = "http://wpa.qq.com/msgrd?v=3&uin='" + this.company.qq + "'&site=qq&menu=yes";
        //this.hrefUrl="tencent://message/?uin='"+this.company.qq+"'&site=qq&menu=yes";
    };
    AboutUsPage.prototype.callPhone = function (passedNumber) {
        window.location = passedNumber;
    };
    return AboutUsPage;
}());
AboutUsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-about-us',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\setting\about-us\about-us.html"*/'<!--\n\n  Generated template for the AboutUs page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>关于我们</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n  <div text-center padding-vertical>\n\n    <img style="width: 100px;height: 100px;" src="assets/img/wel1.png">\n\n  </div>\n\n\n\n\n\n  <ion-item-group>\n\n    <ion-item-divider color="light">应用信息</ion-item-divider>\n\n    <ion-item padding-right>\n\n      <ion-label>当前版本</ion-label>\n\n      <div item-content>\n\n        {{app.versionNumber}}\n\n      </div>\n\n    </ion-item>\n\n\n\n    <ion-item padding-right>\n\n      <ion-label>当前环境</ion-label>\n\n      <div item-content>\n\n        {{app.envir}}\n\n      </div>\n\n    </ion-item>\n\n  </ion-item-group>\n\n\n\n  <ion-item-group style="border-bottom:40px solid #f4f4f4;">\n\n    <ion-item-divider color="light">联系我们</ion-item-divider>\n\n    <button ion-item (click)="callPhone(\'tel:\'+company.phone)">\n\n      <ion-label>联系电话</ion-label>\n\n      <div item-content>\n\n        {{company.phone}}\n\n      </div>\n\n    </button>\n\n\n\n    <!--<button ion-item (click)="callQQ(company.qq)" >\n\n      <ion-label>QQ</ion-label>\n\n      <div item-content>\n\n        {{company.qq}}\n\n      </div>\n\n    </button>-->\n\n    <a ion-item target="_blank" href="{{hrefUrl}}">\n\n      <ion-label>QQ</ion-label>\n\n      <div item-content>\n\n        {{company.qq}}\n\n      </div>\n\n    </a>\n\n\n\n    <ion-item text-wrap>\n\n      <ion-label >地址 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {{company.addr}}</ion-label>\n\n    </ion-item>\n\n  </ion-item-group>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\setting\about-us\about-us.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__["a" /* SqlService */],
        __WEBPACK_IMPORTED_MODULE_2__providers_util_service__["a" /* UtilService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], AboutUsPage);

//# sourceMappingURL=about-us.js.map

/***/ })

});
//# sourceMappingURL=28.main.js.map