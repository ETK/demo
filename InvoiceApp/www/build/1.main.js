webpackJsonp([1],{

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_list__ = __webpack_require__(370);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserListPageModule", function() { return UserListPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UserListPageModule = (function () {
    function UserListPageModule() {
    }
    return UserListPageModule;
}());
UserListPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__user_list__["a" /* UserListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__user_list__["a" /* UserListPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__user_list__["a" /* UserListPage */]
        ]
    })
], UserListPageModule);

//# sourceMappingURL=user-list.module.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserListPage; });
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
 Generated class for the UserList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var UserListPage = (function () {
    function UserListPage(navCtrl, utilService, sqlService, navParams) {
        this.navCtrl = navCtrl;
        this.utilService = utilService;
        this.sqlService = sqlService;
        this.navParams = navParams;
        this.placeholder = "请输入关键字";
        this.myInput = "";
        this.getData();
    }
    UserListPage.prototype.getData = function () {
        var _this = this;
        this.sqlService.query('user').then(function (data) {
            _this.totalData = _this.utilService.sqliteToArrqy(data.res.rows);
            _this.items = _this.totalData;
        }).catch(function (err) {
            console.error(err);
        });
    };
    UserListPage.prototype.addItem = function () {
        var _this = this;
        var inputs = [
            { name: 'userno', placeholder: '请输入用户编号', type: 'number' },
            { name: 'username', placeholder: '请输入用户名' }
        ];
        this.utilService.showPrompt('', '新增用户', inputs, (function (data) {
            if (!data.userno || !data.username) {
                data['flag'] = false;
                _this.utilService.showToast('用户编号和用户名不能为空');
            }
            else {
                var isRepeat = false;
                for (var _i = 0, _a = _this.totalData; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.user_no == data.userno) {
                        isRepeat = true;
                        break;
                    }
                }
                if (isRepeat) {
                    data['flag'] = false;
                    _this.utilService.showToast('此编号用户已存在');
                }
                else {
                    _this.add(data);
                }
            }
        }));
    };
    UserListPage.prototype.add = function (data) {
        var _this = this;
        var obj = {
            'user_no': data.userno,
            'username': data.username,
            'password': '1',
            'img': ''
        };
        this.sqlService.save('user', obj).then(function () {
            _this.getData();
        }).catch(function (err) {
            console.error(err);
        });
    };
    UserListPage.prototype.deleteItem = function (item) {
        var _this = this;
        this.utilService.showConfirm('确定要删除此条数据?', '提示', function () {
            var condition = "id='" + item.id + "'";
            _this.sqlService.remove('user', condition).then(function () {
                _this.getData();
            }).catch(function (err) {
                console.error(err);
            });
        });
    };
    UserListPage.prototype.onInput = function () {
        var _this = this;
        var array = [];
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var data = _a[_i];
            if (data.user_no.indexOf(this.myInput) >= 0 || data.username.indexOf(this.myInput) >= 0) {
                array.push(data);
            }
        }
        //console.log(array);
        this.utilService.refreshUI(function () {
            _this.items = array;
        });
    };
    UserListPage.prototype.onClear = function () {
        this.items = this.totalData;
    };
    return UserListPage;
}());
UserListPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-user-list',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\user-list\user-list.html"*/'<!--\n\n  Generated template for the UserList page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>用户管理</ion-title>\n\n    <ion-buttons end>\n\n      <button tappable ion-button icon-only (click)="addItem()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n\n\n</ion-header>\n\n<ion-content>\n\n  <ion-searchbar\n\n    [(ngModel)]="myInput"\n\n    (ionInput)="onInput()"\n\n    [placeholder]="placeholder"\n\n    (ionClear)="onClear()"\n\n  >\n\n  </ion-searchbar>\n\n <ion-list>\n\n   <ion-item  *ngFor="let item of items" (press)="deleteItem(item)">\n\n     <ion-label  item-left>编号：{{item.user_no}}</ion-label>\n\n     <ion-label  item-right>名称：{{item.username}}</ion-label>\n\n   </ion-item>\n\n  </ion-list>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\user-list\user-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_util_service__["a" /* UtilService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__["a" /* SqlService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], UserListPage);

//# sourceMappingURL=user-list.js.map

/***/ })

});
//# sourceMappingURL=1.main.js.map