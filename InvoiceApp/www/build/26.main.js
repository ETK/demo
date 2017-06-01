webpackJsonp([26],{

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__setting__ = __webpack_require__(345);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingPageModule", function() { return SettingPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SettingPageModule = (function () {
    function SettingPageModule() {
    }
    return SettingPageModule;
}());
SettingPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__setting__["a" /* SettingPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__setting__["a" /* SettingPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__setting__["a" /* SettingPage */]
        ]
    })
], SettingPageModule);

//# sourceMappingURL=setting.module.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_image_picker__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sql_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_update_service__ = __webpack_require__(216);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SettingPage = (function () {
    function SettingPage(navCtrl, utilService, sqlService, imagePicker, actionSheetCtrl, camera, updateService, platform) {
        this.navCtrl = navCtrl;
        this.utilService = utilService;
        this.sqlService = sqlService;
        this.imagePicker = imagePicker;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.updateService = updateService;
        this.platform = platform;
        this.user = {};
        this.initData();
    }
    SettingPage.prototype.initData = function () {
        var _this = this;
        this.utilService.getByKey('userName').then(function (result) {
            _this.user.username = result;
        });
        var date = new Date();
        this.user.loginTime = this.utilService.formatDate(date);
        this.utilService.getByKey('userNo').then(function (result) {
            _this.user.userNo = result;
        });
        this.utilService.getByKey('userAvavar').then(function (result) {
            _this.user.avatarUrl = result;
        });
        this.utilService.getByKey('alarmFlag').then(function (result) {
            _this.isMesChecked = result;
        });
    };
    SettingPage.prototype.modifyAvatar = function () {
        var _this = this;
        //修改头像
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: '拍照',
                    role: '拍照',
                    handler: function () {
                        _this.cameraFun();
                    }
                },
                {
                    text: '相册',
                    role: '相册',
                    handler: function () {
                        _this.imagePickerFun();
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    SettingPage.prototype.imagePickerFun = function () {
        var _this = this;
        var imagePickerOpt = {
            maximumImagesCount: 1,
            width: 200,
            height: 200,
            quality: 100
        };
        this.imagePicker.getPictures(imagePickerOpt).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
                _this.user.avatarUrl = results[i];
                _this.addImg(results[i]);
            }
        }, function (err) {
            _this.utilService.showToast(err);
        });
    };
    SettingPage.prototype.cameraFun = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            // let base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.utilService.refreshUI(function () {
                _this.user.avatarUrl = imageData;
                _this.addImg(imageData);
            });
        }, function (err) {
            // Handle error
            _this.utilService.showToast(err);
        });
    };
    SettingPage.prototype.addImg = function (imageData) {
        var sql = "update user set img='" + imageData + "' where user_no='" + this.user.userNo + "'";
        this.sqlService.execSql(sql, []);
    };
    ;
    SettingPage.prototype.changeToggle = function (event) {
        this.utilService.setByKey('alarmFlag', event.checked);
    };
    ;
    SettingPage.prototype.modifyPassword = function () {
        //修改密码
        this.navCtrl.push('ModifyPasswordPage', { 'userNo': this.user.userNo });
    };
    ;
    SettingPage.prototype.clearCache = function () {
        //清除缓存
        /**
         * 1.storge :暂时不能清除登录用户的信息
         * 2.否则，只能在这里退出app
         */
        /*  this.utilService.storageClear().then(()=>{
         setTimeout(()=>{
         this.utilService.showToast("数据清除成功");
         },500)
         }
         );*/
        var _this = this;
        this.utilService.showConfirm('是否清楚所有本地数据?', '清除数据', function () {
            _this.utilService.showLoading();
            _this.sqlService.dropTable(true);
            /* setTimeout(() => {
                 this.sqlService.initUserData();
                 this.sqlService.initBaseData();
 
             }, 1000)*/
            setTimeout(function () {
                _this.utilService.hideLoading();
                _this.utilService.showToast("数据清除成功");
            }, 2000);
        });
    };
    ;
    SettingPage.prototype.updateApp = function () {
        //检查更新
        //this.updateService.checkUpdate('setting');
    };
    ;
    SettingPage.prototype.aboutAs = function () {
        //关于我们
        this.navCtrl.push('AboutUsPage');
    };
    ;
    SettingPage.prototype.logOut = function () {
        var _this = this;
        //退出登录
        if (this.utilService.getPlatform() == 'mobile') {
            this.utilService.showConfirm('是否退出本应用?', '退出', function () {
                _this.utilService.removeByKey('passWord');
                _this.utilService.removeByKey('userName');
                _this.platform.exitApp();
            });
        }
    };
    ;
    return SettingPage;
}());
SettingPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-setting',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\setting\setting.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      设置\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-item style="height: 120px;" tappable (click)="modifyAvatar()">\n\n      <ion-thumbnail item-left>\n\n        <img src="{{user.avatarUrl}}">\n\n      </ion-thumbnail>\n\n      <h2>{{user.username}}</h2>\n\n      <p>{{user.loginTime}}</p>\n\n    </ion-item>\n\n\n\n    <button ion-item  tappable (click)="modifyPassword()">\n\n      <ion-icon name="ios-create-outline" item-left></ion-icon>\n\n      修改密码\n\n    </button>\n\n    <button ion-item tappable (click)="clearCache()">\n\n      <ion-icon name="ios-trash-outline" item-left></ion-icon>\n\n      清除缓存\n\n    </button>\n\n   <!-- <button ion-item tappable (click)="messageSet()">\n\n      <ion-icon name="ios-volume-up-outline" item-left></ion-icon>\n\n      消息推送\n\n    </button>-->\n\n\n\n    <ion-item>\n\n      <ion-icon name="ios-volume-up-outline" item-left></ion-icon>\n\n      <ion-label>消息推送</ion-label>\n\n      <ion-toggle [checked]="isMesChecked"  (ionChange) ="changeToggle($event)"></ion-toggle>\n\n    </ion-item>\n\n\n\n    <button ion-item tappable (click)="updateApp()">\n\n      <ion-icon name="ios-sync-outline" item-left></ion-icon>\n\n      检查更新\n\n    </button>\n\n    <button ion-item  tappable (click)="aboutAs()">\n\n      <ion-icon name="ios-at-outline" item-left></ion-icon>\n\n      关于我们\n\n    </button>\n\n    <button ion-item tappable (click)="logOut()">\n\n      <ion-icon name="ios-log-out-outline" item-left></ion-icon>\n\n      退出登录\n\n    </button>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\setting\setting.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_util_service__["a" /* UtilService */],
        __WEBPACK_IMPORTED_MODULE_5__providers_sql_service__["a" /* SqlService */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_image_picker__["a" /* ImagePicker */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_6__providers_update_service__["a" /* UpdateService */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* Platform */]])
], SettingPage);

//# sourceMappingURL=setting.js.map

/***/ })

});
//# sourceMappingURL=26.main.js.map