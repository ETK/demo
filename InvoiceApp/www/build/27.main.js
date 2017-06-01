webpackJsonp([27],{

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modify_password__ = __webpack_require__(344);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifyPasswordPageModule", function() { return ModifyPasswordPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ModifyPasswordPageModule = (function () {
    function ModifyPasswordPageModule() {
    }
    return ModifyPasswordPageModule;
}());
ModifyPasswordPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__modify_password__["a" /* ModifyPasswordPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__modify_password__["a" /* ModifyPasswordPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__modify_password__["a" /* ModifyPasswordPage */]
        ]
    })
], ModifyPasswordPageModule);

//# sourceMappingURL=modify-password.module.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModifyPasswordPage; });
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
 Generated class for the ModifyPassword page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var ModifyPasswordPage = (function () {
    function ModifyPasswordPage(navCtrl, navParams, app, sqlService, utilService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.sqlService = sqlService;
        this.utilService = utilService;
        this.user = {};
        this.userNo = navParams.get('userNo');
    }
    ModifyPasswordPage.prototype.save = function () {
        var _this = this;
        if (!this.user.oldPassword || !this.user.newPassword || !this.user.new2Password) {
            this.utilService.showToast("密码不能为空");
        }
        else if (this.user.newPassword != this.user.new2Password) {
            this.user.newPassword = '';
            this.user.new2Password = '';
            this.utilService.showToast("2次密码不一样");
        }
        else if (this.user.oldPassword === this.user.newPassword) {
            this.user.newPassword = '';
            this.user.new2Password = '';
            this.utilService.showToast("新密码不能和原密码一样");
        }
        else {
            this.utilService.getByKey("passWord").then(function (passWord) {
                if (_this.user.oldPassword != passWord) {
                    _this.utilService.showToast("原密码错误");
                }
                else {
                    //请求接口修改密码
                    _this.modifyPwdFun();
                }
            });
        }
    };
    ModifyPasswordPage.prototype.modifyPwdFun = function () {
        var _this = this;
        var sql = "update user set password='" + this.user.new2Password + "' where user_no='" + this.userNo + "'";
        this.sqlService.execSql(sql, []).then(function () {
            _this.utilService.removeByKey('passWord').then(function () {
                _this.utilService.showToast("修改成功!");
                setTimeout(function () {
                    _this.app.getRootNav().setRoot('LoginPage');
                }, 500);
            });
        }).catch(function (err) {
            console.error(err);
        });
    };
    return ModifyPasswordPage;
}());
ModifyPasswordPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-modify-password',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\setting\modify-password\modify-password.html"*/'<!--\n\n  Generated template for the ModifyPassword page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>修改密码</ion-title>\n\n    <ion-buttons end>\n\n      <button tappable ion-button icon-only (click)="save()">\n\n        <ion-icon name="checkmark"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-list>\n\n\n\n    <ion-item>\n\n      <ion-label fixed>原密码</ion-label>\n\n      <ion-input type="password" [(ngModel)]="user.oldPassword"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label fixed>新密码</ion-label>\n\n      <ion-input type="password" [(ngModel)]="user.newPassword"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label fixed>确认新密码</ion-label>\n\n      <ion-input type="password" [(ngModel)]="user.new2Password"></ion-input>\n\n    </ion-item>\n\n\n\n\n\n  </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\setting\modify-password\modify-password.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* App */],
        __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__["a" /* SqlService */],
        __WEBPACK_IMPORTED_MODULE_2__providers_util_service__["a" /* UtilService */]])
], ModifyPasswordPage);

//# sourceMappingURL=modify-password.js.map

/***/ })

});
//# sourceMappingURL=27.main.js.map