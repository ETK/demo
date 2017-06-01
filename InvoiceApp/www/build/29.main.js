webpackJsonp([29],{

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__report__ = __webpack_require__(342);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportPageModule", function() { return ReportPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ReportPageModule = (function () {
    function ReportPageModule() {
    }
    return ReportPageModule;
}());
ReportPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__report__["a" /* ReportPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__report__["a" /* ReportPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__report__["a" /* ReportPage */]
        ]
    })
], ReportPageModule);

//# sourceMappingURL=report.module.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReportPage = (function () {
    function ReportPage(platform, navCtrl, utilService) {
        this.navCtrl = navCtrl;
        this.utilService = utilService;
        this.rptType = "sale";
        this.selectedIndex = 0;
        this.rptArray = [{
                rptType: 'sale',
                rptName: '销售报表'
            }, {
                rptType: 'purchase',
                rptName: '采购报表'
            }, {
                rptType: 'stk',
                rptName: '库存报表'
            }];
    }
    ReportPage.prototype.titleClick = function (rpt, index) {
        this.rptType = rpt.rptType;
        this.selectedIndex = index;
    };
    return ReportPage;
}());
ReportPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-report',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\report\report.html"*/'<ion-header>\n\n  <ion-navbar no-border-bottom>\n\n    <ion-title>\n\n      报表\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  \n\n  <ion-slides class="slide-title" slidesPerView=3  pager=false>\n\n    <ion-slide *ngFor="let rpt of rptArray; let i = index;">\n\n      <div (click)="titleClick(rpt,i)">\n\n        <span class="slide-title-unit" [ngClass]="{\'slide-title-active\': selectedIndex == i}">{{rpt.rptName}}</span>\n\n      </div>\n\n    </ion-slide>\n\n  </ion-slides>\n\n\n\n\n\n  <div [ngSwitch]="rptType">\n\n    <ion-list *ngSwitchCase="\'sale\'">\n\n      <ion-item>       \n\n        <h2>销售日报表</h2>\n\n      </ion-item>\n\n      <ion-item>\n\n        <h2>销售月报表</h2>\n\n      </ion-item>\n\n      <ion-item>\n\n      <h2>销售季报表</h2>\n\n      </ion-item>\n\n      <ion-item>\n\n        <h2>销售年报表</h2>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <ion-list *ngSwitchCase="\'purchase\'">\n\n      <ion-item>\n\n      <h2>采购退货率</h2>\n\n      </ion-item>\n\n      <ion-item>\n\n        <h2>采购交货率</h2>\n\n      </ion-item>    \n\n    </ion-list>\n\n\n\n    <ion-list *ngSwitchCase="\'stk\'">\n\n      <ion-item>\n\n        进出仓明细查询\n\n      </ion-item>\n\n      <ion-item>\n\n        安全库存分析\n\n      </ion-item>      \n\n    </ion-list>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\report\report.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_util_service__["a" /* UtilService */]])
], ReportPage);

//# sourceMappingURL=report.js.map

/***/ })

});
//# sourceMappingURL=29.main.js.map