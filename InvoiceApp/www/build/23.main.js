webpackJsonp([23],{

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customer_edit__ = __webpack_require__(348);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerEditPageModule", function() { return CustomerEditPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CustomerEditPageModule = (function () {
    function CustomerEditPageModule() {
    }
    return CustomerEditPageModule;
}());
CustomerEditPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__customer_edit__["a" /* CustomerEditPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__customer_edit__["a" /* CustomerEditPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__customer_edit__["a" /* CustomerEditPage */]
        ]
    })
], CustomerEditPageModule);

//# sourceMappingURL=customer-edit.module.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_contacts__ = __webpack_require__(222);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerEditPage; });
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
 Generated class for the CustomerEdit page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var CustomerEditPage = (function () {
    function CustomerEditPage(navCtrl, navParams, utilService, contacts, sqlService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.utilService = utilService;
        this.contacts = contacts;
        this.sqlService = sqlService;
        this.item = this.navParams.get('item');
        if (this.item) {
            //编辑
            this.flag = 1;
            this.titleText = '编辑';
            this.isCustomerNoDisabled = true;
            this.obj = this.item;
        }
        else {
            //添加
            this.obj = {};
            this.titleText = '添加';
            this.isCustomerNoDisabled = false;
            this.flag = 2;
        }
    }
    //打开设备联系人列表选择
    CustomerEditPage.prototype.openContacts = function () {
        var _this = this;
        this.contacts.pickContact().then(function (result) {
            //alert(JSON.stringify(result));
            if (result) {
                _this.obj.contact = result.displayName;
                _this.obj.phone = result.phoneNumbers[0].value;
            }
        }).catch(function (err) {
            alert(JSON.stringify(err));
        });
    };
    CustomerEditPage.prototype.save = function () {
        var _this = this;
        if (!this.obj.customer_no || !this.obj.customer_name || !this.obj.customer_addr || !this.obj.contact || !this.obj.phone) {
            this.utilService.showToast("请注意查看必填信息");
            return;
        }
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        //验证手机号(暂时去掉)
        /*const regex = /^1[3|4|5|7|8][0-9]{9}$/;
         if (!regex.test(this.obj.phone)) {
         this.utilService.showToast("请输入正确的移动电话号码");
         return;
         }*/
        if (this.obj.email && !reg.test(this.obj.email)) {
            this.utilService.showToast("请输入正确的邮箱");
            return;
        }
        this.sqlService.save('customer', this.obj).then(function () {
            _this.navCtrl.pop();
        }).catch(function (err) {
            console.error(err);
        });
    };
    return CustomerEditPage;
}());
CustomerEditPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-customer-edit',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\customer-edit\customer-edit.html"*/'<!--\n\n  Generated template for the CustomerEdit page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{titleText}}</ion-title>\n\n    <ion-buttons end>\n\n      <button tappable ion-button icon-only (click)="save()">\n\n        <ion-icon name="checkmark"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-list>\n\n\n\n    <ion-item>\n\n      <ion-label fixed>客户编号</ion-label>\n\n      <ion-input [(ngModel)]="obj.customer_no" placeholder="客户编号(必填)" [disabled]="isCustomerNoDisabled"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label fixed>客户名称</ion-label>\n\n      <ion-input [(ngModel)]="obj.customer_name" placeholder="客户名称(必填)"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label fixed>客户昵称</ion-label>\n\n      <ion-input [(ngModel)]="obj.customer_nickname" placeholder="客户昵称"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label fixed>客户地址</ion-label>\n\n      <ion-input [(ngModel)]="obj.customer_addr" placeholder="客户地址(必填)"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label fixed>联系人</ion-label>\n\n      <ion-input [(ngModel)]="obj.contact" placeholder="联系人(必填)"></ion-input>\n\n      <button ion-button item-right (click)="openContacts()">\n\n        <ion-icon name="contact"></ion-icon>\n\n      </button>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label fixed>电话</ion-label>\n\n      <ion-input type="number" [(ngModel)]="obj.phone" placeholder="电话(必填)"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label fixed>邮箱</ion-label>\n\n      <ion-input [(ngModel)]="obj.email" placeholder="邮箱"></ion-input>\n\n    </ion-item>\n\n\n\n\n\n  </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\customer-edit\customer-edit.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_util_service__["a" /* UtilService */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_contacts__["a" /* Contacts */],
        __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__["a" /* SqlService */]])
], CustomerEditPage);

//# sourceMappingURL=customer-edit.js.map

/***/ })

});
//# sourceMappingURL=23.main.js.map