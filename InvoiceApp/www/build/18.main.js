webpackJsonp([18],{

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__goods_edit__ = __webpack_require__(353);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoodsEditPageModule", function() { return GoodsEditPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GoodsEditPageModule = (function () {
    function GoodsEditPageModule() {
    }
    return GoodsEditPageModule;
}());
GoodsEditPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__goods_edit__["a" /* GoodsEditPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__goods_edit__["a" /* GoodsEditPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__goods_edit__["a" /* GoodsEditPage */]
        ]
    })
], GoodsEditPageModule);

//# sourceMappingURL=goods-edit.module.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sql_service__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoodsEditPage; });
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
 Generated class for the GoodsEdit page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var GoodsEditPage = (function () {
    function GoodsEditPage(navCtrl, navParams, util, imagePicker, camera, sqlService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.util = util;
        this.imagePicker = imagePicker;
        this.camera = camera;
        this.sqlService = sqlService;
        this.item = this.navParams.get('item');
        if (this.item) {
            //编辑
            this.flag = 1;
            this.titleText = '编辑';
            this.isCreatorShow = false;
            this.isDoodNoDisabled = true;
            this.obj = this.item;
        }
        else {
            //添加
            this.obj = {};
            this.titleText = '添加';
            this.isCreatorShow = true;
            this.isDoodNoDisabled = false;
            this.flag = 2;
        }
    }
    GoodsEditPage.prototype.modifyPic = function () {
        var _this = this;
        this.util.showActionSheet('拍照', '相册', function () {
            _this.cameraFun();
        }, function () {
            _this.imagePickerFun();
        });
    };
    GoodsEditPage.prototype.cameraFun = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.util.refreshUI(function () {
                _this.obj.img = imageData;
            });
        }, function (err) {
            // Handle error
            _this.util.showToast(err);
        });
    };
    GoodsEditPage.prototype.imagePickerFun = function () {
        var _this = this;
        var imagePickerOpt = {
            maximumImagesCount: 1,
            width: 200,
            height: 200,
            quality: 100
        };
        this.imagePicker.getPictures(imagePickerOpt).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                _this.obj.img = results[i];
            }
        }, function (err) {
            _this.util.showToast(err);
        });
    };
    GoodsEditPage.prototype.save = function () {
        if (!this.obj.good_no || !this.obj.good_name || !this.obj.purchase_price || !this.obj.sale_price || !this.obj.mini_safe_num || !this.obj.max_safe_num) {
            this.util.showToast("请注意查看必填信息");
            return;
        }
        if (!this.obj.cost_price) {
            //当没有输入成本价时，成本价等于进价
            this.obj.cost_price = this.obj.purchase_price;
        }
        else {
            //成本价必须大于进价
            if (this.obj.cost_price <= this.obj.purchase_price) {
                this.util.showToast("成本价必须大于采购价");
                return;
            }
        }
        //销售价必须大于成本价
        if (this.obj.sale_price && this.obj.sale_price <= this.obj.cost_price) {
            this.util.showToast("销售价必须大于成本价");
            return;
        }
        //销售价必须大于采购价
        if (this.obj.sale_price && this.obj.sale_price <= this.obj.purchase_price) {
            this.util.showToast("销售价必须大于采购价");
            return;
        }
        //最高安全库存必须大于最低安全库存
        if (this.obj.max_safe_num <= this.obj.mini_safe_num) {
            this.util.showToast("最高安全库存必须大于最低安全库存");
            return;
        }
        this.addToSqlite();
    };
    GoodsEditPage.prototype.addToSqlite = function () {
        var _this = this;
        this.util.getByKey('userName').then(function (result) {
            _this.obj.creator = result;
            _this.obj.create_time = _this.util.getNowFormatDate();
            _this.sqlService.save('good', _this.obj).then(function () {
                _this.navCtrl.pop();
            }).catch(function (err) {
                console.error(err);
            });
        });
    };
    return GoodsEditPage;
}());
GoodsEditPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-goods-edit',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\goods-edit\goods-edit.html"*/'<!--\n\n  Generated template for the GoodsEdit page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{titleText}}</ion-title>\n\n    <ion-buttons end>\n\n      <button tappable ion-button icon-only (click)="save()">\n\n        <ion-icon name="checkmark"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <div text-center padding-vertical tappable (click)="modifyPic()">\n\n    <img style="width: 80px;height: 80px;" src="{{obj.img}}">\n\n  </div>\n\n\n\n  <ion-list>\n\n    <ion-item>\n\n      <ion-label>商品编号</ion-label>\n\n      <ion-input [(ngModel)]="obj.good_no" placeholder="商品编号(必填)" [disabled]="isDoodNoDisabled"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>商品名称</ion-label>\n\n      <ion-input [(ngModel)]="obj.good_name" placeholder="商品名称(必填)"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>基本单位</ion-label>\n\n      <ion-input [(ngModel)]="obj.unit" placeholder="基本单位"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>采购价</ion-label>\n\n      <ion-input type="number" [(ngModel)]="obj.purchase_price" placeholder="采购价(必填)"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>成本价</ion-label>\n\n      <ion-input type="number" [(ngModel)]="obj.cost_price" placeholder="成本价"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>销售价</ion-label>\n\n      <ion-input type="number" [(ngModel)]="obj.sale_price" placeholder="销售价(必填)"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>最低安全库存</ion-label>\n\n      <ion-input type="number" [(ngModel)]="obj.mini_safe_num" placeholder="最低安全库存(必填)"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>最高安全库存</ion-label>\n\n      <ion-input type="number" [(ngModel)]="obj.max_safe_num" placeholder="最高安全库存(必填)"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>条形码</ion-label>\n\n      <ion-input type="number" [(ngModel)]="obj.barcode" placeholder="条形码"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item [hidden]="isCreatorShow">\n\n      <ion-label>创建人</ion-label>\n\n      <ion-input [(ngModel)]="obj.creator" placeholder="创建人" [disabled]="true"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item [hidden]="isCreatorShow">\n\n      <ion-label>创建时间</ion-label>\n\n      <ion-input  [(ngModel)]="obj.create_time" placeholder="创建时间" [disabled]="true"></ion-input>\n\n    </ion-item>\n\n\n\n  </ion-list>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\goods-edit\goods-edit.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_util_service__["a" /* UtilService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__["a" /* ImagePicker */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_5__providers_sql_service__["a" /* SqlService */]])
], GoodsEditPage);

//# sourceMappingURL=goods-edit.js.map

/***/ })

});
//# sourceMappingURL=18.main.js.map