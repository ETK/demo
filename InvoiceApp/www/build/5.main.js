webpackJsonp([5],{

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transfer_detail__ = __webpack_require__(366);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransferDetailPageModule", function() { return TransferDetailPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TransferDetailPageModule = (function () {
    function TransferDetailPageModule() {
    }
    return TransferDetailPageModule;
}());
TransferDetailPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__transfer_detail__["a" /* TransferDetailPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__transfer_detail__["a" /* TransferDetailPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__transfer_detail__["a" /* TransferDetailPage */]
        ]
    })
], TransferDetailPageModule);

//# sourceMappingURL=transfer-detail.module.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_stk_service__ = __webpack_require__(214);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransferDetailPage; });
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
  调拨单明细页面
  wudefeng
  2017-5-11
*/
var TransferDetailPage = (function () {
    function TransferDetailPage(navCtrl, navParams, viewCtrl, sqlHelp, util, modalCtrl, stkService, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.sqlHelp = sqlHelp;
        this.util = util;
        this.modalCtrl = modalCtrl;
        this.stkService = stkService;
        this.popoverCtrl = popoverCtrl;
        this.title = "新增调拨单";
        this.item = {};
        this.goodsList = [];
        this.billStatus = '10';
        this.isAdd = true;
        this.storeList = [];
    }
    TransferDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var obj = this.navParams.get('item');
        this.parentPage = this.navParams.get('parentPage');
        if (obj) {
            this.item = obj;
            this.sqlHelp.getRowsBySql('select a.*,b.cost_price from bl_transfer_dtl a join good b on a.good_no=b.good_no  where bill_no=?', [obj.bill_no]).then(function (data) {
                _this.goodsList = [].concat(data);
            });
            this.billStatus = obj.bill_status;
            this.isAdd = false;
            this.title = "调拨单明细";
        }
        else {
            this.item = {
                bill_status: '10',
                creator: this.util.loginUser,
                create_time: this.util.getNowFormatDate()
            };
            this.sqlHelp.getCodeNo("TO").then(function (no) {
                _this.item.bill_no = no;
            });
        }
    };
    TransferDetailPage.prototype.exit = function (isChange) {
        if (isChange === void 0) { isChange = false; }
        this.parentPage && this.parentPage.getData && this.parentPage.getData(true);
        this.navCtrl.pop();
    };
    TransferDetailPage.prototype.save = function () {
        var _this = this;
        var errmsg = "";
        if (this.item.out_store_no == this.item.in_store_no) {
            errmsg = "不能相同仓库进行调拨";
        }
        if (this.goodsList.length == 0) {
            errmsg = "还没有选择物料，不能保存";
        }
        if (errmsg.length > 0) {
            this.util.showAlert(errmsg, "错误");
            return;
        }
        var obj = {
            bill_no: this.item.bill_no,
            bill_status: this.item.bill_status,
            out_store_no: this.item.out_store_no,
            in_store_no: this.item.in_store_no,
            creator: this.util.loginUser,
            create_time: this.util.getNowFormatDate()
        };
        var dtllist = this.goodsList.map(function (item) { delete item.cost_price; return item; });
        this.sqlHelp.saveBill("bl_transfer", obj, "bl_transfer_dtl", dtllist).then(function (data) {
            console.info("单据保存成功");
            _this.exit(true);
        }).catch(function (err) {
            console.error("保存失败", err);
        });
    };
    TransferDetailPage.prototype.chooseStore = function (storetype) {
        var _this = this;
        if (this.goodsList.length > 0 || this.billStatus == "20")
            return;
        var storepage = this.modalCtrl.create('DepotListPage', { isChoose: true });
        storepage.onDidDismiss(function (store) {
            if (store) {
                if (storetype == "O") {
                    _this.item.out_store_no = store.store_no;
                    _this.item.out_store_name = store.store_name;
                }
                else {
                    _this.item.in_store_no = store.store_no;
                    _this.item.in_store_name = store.store_name;
                }
            }
        });
        storepage.present();
    };
    TransferDetailPage.prototype.changeQty = function (obj, qty) {
        if (qty == -1 && obj.qty == 1)
            return;
        obj.qty += qty;
    };
    TransferDetailPage.prototype.inputQty = function (obj) {
        var _this = this;
        if (this.billStatus != "10")
            return;
        this.util.showPrompt('', '输入数量', [{ name: 'qty', placeholder: '请输入调拨数量', type: 'number', value: obj.qty }], function (data) {
            if (data.qty == "") {
                _this.util.showAlert("请输入数量");
                return false;
            }
            if (Number(data.qty) > 0) {
                obj.qty = data.qty;
            }
        });
    };
    TransferDetailPage.prototype.chooseGoods = function () {
        if (!this.item.in_store_no || !this.item.out_store_no) {
            this.util.showAlert("请先选择调出仓及调入仓");
            return;
        }
        this.navCtrl.push('TransferGoodsPage', { parentPage: this });
    };
    TransferDetailPage.prototype.deleteItem = function (item) {
        this.goodsList.splice(this.goodsList.indexOf(item), 1);
    };
    TransferDetailPage.prototype.showMore = function (ev) {
        var popover = this.popoverCtrl.create('TransferToolPage', {
            parentPage: this
        }, { cssClass: "mypopover" });
        popover.present({
            ev: ev
        });
    };
    TransferDetailPage.prototype.getTotalCost = function () {
        var cost = 0;
        for (var _i = 0, _a = this.goodsList; _i < _a.length; _i++) {
            var item = _a[_i];
            cost += item.cost_price * item.qty;
        }
        return cost;
    };
    TransferDetailPage.prototype.getTotalCount = function () {
        return this.goodsList.length;
    };
    return TransferDetailPage;
}());
TransferDetailPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-transfer-detail',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\transfer-detail\transfer-detail.html"*/'<!--\n\n  调拨明细页.\n\n  wudefeng\n\n  2017-05-11\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{title}}</ion-title>\n\n    <ion-buttons end  *ngIf="billStatus==\'10\' && !isAdd">\n\n      <button ion-button (click)="showMore($event)" icon-only>\n\n        <ion-icon name="more"></ion-icon>\n\n       </button>      \n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-item>\n\n      <ion-label>单据编号</ion-label>\n\n      <ion-input type="text" [(ngModel)]="item.bill_no" disabled=true text-right></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>调出仓</ion-label>\n\n      <ion-input [(ngModel)]="item.out_store_name" tappable placeholder="请选择仓库" readonly (click)="chooseStore(\'O\')" [disabled]="billStatus!=\'10\'"\n\n        text-right>\n\n      </ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>调入仓</ion-label>\n\n      <ion-input [(ngModel)]="item.in_store_name" tappable placeholder="请选择仓库" readonly (click)="chooseStore(\'I\')" [disabled]="billStatus!=\'10\'"\n\n        text-right>\n\n      </ion-input>\n\n    </ion-item>\n\n    <ion-item-divider color="light">\n\n    </ion-item-divider>\n\n    <button ion-item tappable (click)="chooseGoods()" [disabled]="billStatus!=\'10\'">\n\n       <div>调拨商品</div>\n\n       <div item-right>共:{{getTotalCount()}}项</div>      \n\n     </button>\n\n\n\n    <ion-card>\n\n      <ion-list>\n\n        <ion-item-sliding *ngFor="let obj of goodsList">\n\n          <ion-item>\n\n            <ion-icon name=\'cart\' item-left color="primary"></ion-icon>\n\n            {{obj.good_no}}\n\n            <div item-right style="margin-right: -6px" *ngIf="billStatus==\'10\'">\n\n              <button ion-button (click)="changeQty(obj,-1)" style="margin-right:-6px" clear icon-only>\n\n               <ion-icon name="remove"></ion-icon>\n\n           </button>\n\n              <button ion-button (click)="inputQty(obj)" outline style="min-width:35px">\n\n              {{obj.qty}}\n\n            </button>           \n\n              <button ion-button (click)="changeQty(obj,1)" style="margin-left:-6px" clear icon-only *ngIf="billStatus==\'10\'">\n\n               <ion-icon name="add"></ion-icon>\n\n            </button>\n\n            </div>\n\n            <div item-right  *ngIf="billStatus!=\'10\'">{{obj.qty}}</div>\n\n          </ion-item>\n\n          <ion-item-options >\n\n            <button ion-button color="danger" (click)="deleteItem(obj)">\n\n               删除\n\n          </button>\n\n          </ion-item-options>\n\n        </ion-item-sliding>\n\n      </ion-list>\n\n    </ion-card>\n\n    <ion-item-divider color="light"></ion-item-divider>\n\n    <ion-item>\n\n      <ion-label>制单人</ion-label>\n\n      <ion-input type="text" [(ngModel)]="item.creator" disabled=true text-right></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>制单日期</ion-label>\n\n      <ion-input type="text" [(ngModel)]="item.create_time" disabled=true text-right></ion-input>\n\n    </ion-item>\n\n  </ion-list> \n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <ion-item color="light">\n\n    ￥{{getTotalCost()}}\n\n\n\n    <button ion-button item-right (click)="save()" *ngIf="billStatus==\'10\'" medium>保存</button>\n\n    <button ion-button item-right outline color="primary" *ngIf="billStatus==\'20\'">已审核</button>\n\n  </ion-item>\n\n</ion-footer>'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\transfer-detail\transfer-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__["a" /* SqlService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_util_service__["a" /* UtilService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_stk_service__["a" /* StkService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */]])
], TransferDetailPage);

//# sourceMappingURL=transfer-detail.js.map

/***/ })

});
//# sourceMappingURL=5.main.js.map