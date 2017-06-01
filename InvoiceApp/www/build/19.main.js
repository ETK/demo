webpackJsonp([19],{

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__depot_list__ = __webpack_require__(352);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepotListPageModule", function() { return DepotListPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DepotListPageModule = (function () {
    function DepotListPageModule() {
    }
    return DepotListPageModule;
}());
DepotListPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__depot_list__["a" /* DepotListPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__depot_list__["a" /* DepotListPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__depot_list__["a" /* DepotListPage */]
        ]
    })
], DepotListPageModule);

//# sourceMappingURL=depot-list.module.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DepotListPage; });
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
  Generated class for the DepotList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var DepotListPage = (function () {
    function DepotListPage(navCtrl, utilService, sqlService, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.utilService = utilService;
        this.sqlService = sqlService;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.title = "仓库管理";
        this.isChoose = false; //用于判断是否是选择仓库返回值用
        this.placeholder = "请输入关键字";
        this.myInput = "";
        this.getData();
    }
    DepotListPage.prototype.ionViewDidLoad = function () {
        if (this.navParams.get("isChoose")) {
            this.isChoose = true;
            this.title = "选择仓库";
        }
    };
    DepotListPage.prototype.getData = function () {
        var _this = this;
        this.sqlService.query('depot').then(function (data) {
            _this.totalData = _this.utilService.sqliteToArrqy(data.res.rows);
            _this.items = _this.totalData;
        }).catch(function (err) {
            console.error(err);
        });
    };
    DepotListPage.prototype.addItem = function () {
        var _this = this;
        var inputs = [
            { name: 'depot_no', placeholder: '请输入仓库编号', type: 'number' },
            { name: 'depot_name', placeholder: '请输入仓库名' }
        ];
        this.utilService.showPrompt('', '新增仓库', inputs, (function (data) {
            if (!data.depot_no || !data.depot_name) {
                data['flag'] = false;
                _this.utilService.showToast('仓库编号和仓库名不能为空');
            }
            else {
                var isRepeat = false;
                for (var _i = 0, _a = _this.totalData; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.depot_no == data.depot_no) {
                        isRepeat = true;
                        break;
                    }
                }
                if (isRepeat) {
                    data['flag'] = false;
                    _this.utilService.showToast('此编号仓库已存在');
                }
                else {
                    _this.add(data);
                }
            }
        }));
    };
    DepotListPage.prototype.add = function (data) {
        var _this = this;
        var obj = {
            'depot_no': data.depot_no,
            'depot_name': data.depot_name
        };
        this.sqlService.save('depot', obj).then(function () {
            _this.getData();
        }).catch(function (err) {
            console.error(err);
        });
    };
    DepotListPage.prototype.editItem = function (item) {
        var _this = this;
        //选择仓库
        if (this.isChoose) {
            var store = {
                store_no: item.depot_no,
                store_name: item.depot_name
            };
            this.viewCtrl.dismiss(store);
            return;
        }
        //更改仓库
        var inputs = [
            { name: 'depot_name', placeholder: item.depot_name }
        ];
        this.utilService.showPrompt('', '编辑仓库', inputs, (function (data) {
            if (!data.depot_name) {
                data['flag'] = false;
                _this.utilService.showToast('仓库名不能为空');
            }
            else {
                var sql = "update depot set depot_name='" + data.depot_name + "' where depot_no='" + item.depot_no + "'";
                _this.sqlService.execSql(sql, []).then(function () {
                    _this.getData();
                }).catch(function (err) {
                    console.error(err);
                });
            }
        }));
    };
    DepotListPage.prototype.onInput = function () {
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
    DepotListPage.prototype.onClear = function () {
        this.items = this.totalData;
    };
    return DepotListPage;
}());
DepotListPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-depot-list',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\depot-list\depot-list.html"*/'<!--\n\n  Generated template for the DepotList page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n\n\n    <ion-title>{{title}}</ion-title>\n\n    <ion-buttons end>\n\n      <button tappable ion-button icon-only (click)="addItem()">\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content >\n\n  <ion-searchbar\n\n    [(ngModel)]="myInput"\n\n    (ionInput)="onInput()"\n\n    [placeholder]="placeholder"\n\n    (ionClear)="onClear()"\n\n  >\n\n  </ion-searchbar>\n\n  <ion-list>\n\n    <ion-item fixed *ngFor="let item of items" (click)="editItem(item)">\n\n      <ion-label  item-left>编号：{{item.depot_no}}</ion-label >\n\n      <ion-label  item-right>名称：{{item.depot_name}}</ion-label >\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\depot-list\depot-list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_util_service__["a" /* UtilService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_sql_service__["a" /* SqlService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]])
], DepotListPage);

//# sourceMappingURL=depot-list.js.map

/***/ })

});
//# sourceMappingURL=19.main.js.map