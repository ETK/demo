webpackJsonp([22],{

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customer_list__ = __webpack_require__(349);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerListPageModule", function() { return CustomerListPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CustomerListPageModule = (function () {
    function CustomerListPageModule() {
    }
    return CustomerListPageModule;
}());
CustomerListPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__customer_list__["a" /* CustomerListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__customer_list__["a" /* CustomerListPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__customer_list__["a" /* CustomerListPage */]
        ]
    })
], CustomerListPageModule);

//# sourceMappingURL=customer-list.module.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerListPage; });
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
 Generated class for the CustomerList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var CustomerListPage = (function () {
    function CustomerListPage(navCtrl, navParams, utilService, sqlService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.utilService = utilService;
        this.sqlService = sqlService;
        this.placeholder = "请输入关键字";
        this.myInput = "";
    }
    CustomerListPage.prototype.ionViewWillEnter = function () {
        //刷新界面
        this.getData();
    };
    CustomerListPage.prototype.getData = function () {
        var _this = this;
        this.sqlService.query('customer').then(function (data) {
            _this.totalData = _this.utilService.sqliteToArrqy(data.res.rows);
            _this.items = _this.totalData;
        }).catch(function (err) {
            console.error(err);
        });
    };
    CustomerListPage.prototype.editItem = function (item) {
        this.navCtrl.push('CustomerEditPage', { item: item });
    };
    CustomerListPage.prototype.addItem = function () {
        this.navCtrl.push('CustomerEditPage');
    };
    CustomerListPage.prototype.deleteItem = function (item) {
        var _this = this;
        this.utilService.showConfirm('确定要删除此条数据?', '提示', function () {
            //delete到数据库
            var condition = "id='" + item.id + "'";
            _this.sqlService.remove('customer', condition).then(function () {
                _this.getData();
            }).catch(function (err) {
                console.error(err);
            });
        });
    };
    CustomerListPage.prototype.onInput = function () {
        var _this = this;
        var array = [];
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var data = _a[_i];
            if (data.customer_name.indexOf(this.myInput) >= 0 || data.customer_no.indexOf(this.myInput) >= 0) {
                array.push(data);
            }
        }
        //console.log(array);
        this.utilService.refreshUI(function () {
            _this.items = array;
        });
    };
    CustomerListPage.prototype.onClear = function () {
        this.items = this.totalData;
    };
    return CustomerListPage;
}());
CustomerListPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-customer-list',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\customer-list\customer-list.html"*/'<!--\n\n  Generated template for the CustomerList page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>客户管理</ion-title>\n\n    <ion-buttons end>\n\n      <button tappable ion-button icon-only (click)="addItem()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-searchbar\n\n    [(ngModel)]="myInput"\n\n    (ionInput)="onInput()"\n\n    [placeholder]="placeholder"\n\n    (ionClear)="onClear()"\n\n  >\n\n  </ion-searchbar>\n\n  <div style="overflow:scroll;width: 100%">\n\n    <table style="width: 150%;">\n\n      <tr style="height: 40px">\n\n        <th>客户编号</th>\n\n        <th>客户名称</th>\n\n        <th>客户简称</th>\n\n        <th>送货地址</th>\n\n        <th>联系人</th>\n\n        <th>电话</th>\n\n        <th>邮箱</th>\n\n      </tr>\n\n      <tbody>\n\n      <tr *ngFor="let item of items" tappable (click)="editItem(item)" (press)="deleteItem(item)">\n\n        <td>{{item.customer_no}}</td>\n\n        <td> {{item.customer_name}}</td>\n\n        <td> {{item.customer_nickname}}</td>\n\n        <td>{{item.customer_addr}}</td>\n\n        <td>{{item.contact}}</td>\n\n        <td>{{item.phone}}</td>\n\n        <td>{{item.email}}</td>\n\n      </tr>\n\n      </tbody>\n\n    </table>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\customer-list\customer-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_util_service__["a" /* UtilService */], __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__["a" /* SqlService */]])
], CustomerListPage);

//# sourceMappingURL=customer-list.js.map

/***/ })

});
//# sourceMappingURL=22.main.js.map