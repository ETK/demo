webpackJsonp([11],{

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stk_check_input__ = __webpack_require__(360);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StkCheckInputPageModule", function() { return StkCheckInputPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StkCheckInputPageModule = (function () {
    function StkCheckInputPageModule() {
    }
    return StkCheckInputPageModule;
}());
StkCheckInputPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__stk_check_input__["a" /* StkCheckInputPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__stk_check_input__["a" /* StkCheckInputPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__stk_check_input__["a" /* StkCheckInputPage */]
        ]
    })
], StkCheckInputPageModule);

//# sourceMappingURL=stk-check-input.module.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_stk_service__ = __webpack_require__(214);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StkCheckInputPage; });
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
  盘点录入单
  wudefeng
  2017-05-12
*/
var StkCheckInputPage = (function () {
    function StkCheckInputPage(navCtrl, navParams, sqlHelp, util, stk, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlHelp = sqlHelp;
        this.util = util;
        this.stk = stk;
        this.modalCtrl = modalCtrl;
        this.item = {}; //主表对象
        this.checkList = []; //从表对象
        this.isAdd = true; //是否新增 
    }
    StkCheckInputPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var obj = this.navParams.get("item"), sql;
        this.parentPage = this.navParams.get("parentPage");
        if (obj) {
            this.item = obj;
            sql = "select a.*,b.good_name,b.img from bl_stk_check_dtl a \n             join good b on a.good_no=b.good_no where bill_no=?";
            this.sqlHelp.getRowsBySql(sql, [obj.bill_no]).then(function (data) {
                _this.checkList = [].concat(data);
            });
            this.isAdd = false;
        }
        else {
            this.sqlHelp.getCodeNo("PD").then(function (no) {
                _this.item.bill_no = no;
            });
            this.item.bill_status = "10";
        }
    };
    StkCheckInputPage.prototype.inputQty = function (obj) {
        if (!this.isAdd)
            return;
        var qty = obj.input_qty;
        if (typeof qty == undefined) {
            qty = "";
        }
        this.util.showPrompt('系统数量为:' + obj.stk_qty, '输入数量', [{ name: 'qty', placeholder: '输入实际盘点数量', type: 'number', value: qty }], function (data) {
            if (data.qty == "") {
                console.dir("盘点数量必须录入");
                return false;
            }
            obj.input_qty = data.qty;
        });
    };
    StkCheckInputPage.prototype.saveCheck = function () {
        var _this = this;
        var msg = "";
        if (!this.item.store_no) {
            msg = "请选择仓库";
        }
        if (this.getInputCount() < 1) {
            msg = "没有盘点项需保存";
        }
        if (msg.length > 0) {
            this.util.showAlert(msg);
            return;
        }
        var inputList = [];
        for (var _i = 0, _a = this.checkList; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.hasOwnProperty("input_qty")) {
                inputList.push({
                    id: obj.id || null,
                    bill_no: this.item.bill_no,
                    good_no: obj.good_no,
                    cost: obj.cost,
                    stk_qty: obj.stk_qty,
                    input_qty: obj.input_qty
                });
            }
        }
        var checkObj = {
            bill_no: this.item.bill_no,
            bill_status: '10',
            store_no: this.item.store_no,
            creator: this.util.loginUser,
            create_time: this.util.getNowFormatDate().substr(0, 10)
        };
        this.util.showConfirm("确认对录入的" + inputList.length + "项进行盘点?", "", function () {
            _this.sqlHelp.saveBill("bl_stk_check", checkObj, "bl_stk_check_dtl", inputList).then(function (result) {
                _this.stk.stkBiz(_this.item.bill_no, "1005").then(function () {
                    _this.parentPage && _this.parentPage.getData && _this.parentPage.getData(true);
                    _this.navCtrl.pop();
                });
            }).catch(function (error) {
                console.error(error.err.message);
            });
        });
    };
    StkCheckInputPage.prototype.chooseStore = function () {
        var _this = this;
        //当已录入了盘点数量，不能更改仓库
        if (this.getInputCount() > 0 || this.item.bill_status == "20") {
            return;
        }
        var storepage = this.modalCtrl.create('DepotListPage', { isChoose: true });
        storepage.onDidDismiss(function (store) {
            if (store) {
                _this.item.store_no = store.store_no;
                _this.item.store_name = store.store_name;
                //加载商品库存
                var sql = "select a.good_no,a.good_name,a.img,a.cost_price as cost,ifnull(b.qty,0) as stk_qty \n                   from good a  join stk b on a.good_no=b.good_no\n                   where 1=1 and b.store_no=? union all\n                   select a.good_no,a.good_name,a.img,a.cost_price as cost,0 as stk_qty \n                   from good a  where not exists(select 1 from stk b where a.good_no=b.good_no and b.store_no=?)";
                _this.sqlHelp.getRowsBySql(sql, [store.store_no, store.store_no]).then(function (rows) {
                    _this.checkList = [].concat(rows);
                });
            }
        });
        storepage.present();
    };
    StkCheckInputPage.prototype.getInputCount = function () {
        return this.checkList.filter(function (item) { return item.hasOwnProperty("input_qty"); }).length;
    };
    StkCheckInputPage.prototype.getTotalCost = function () {
        var cost = 0;
        for (var _i = 0, _a = this.checkList; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.hasOwnProperty("input_qty")) {
                cost += (item.input_qty - item.stk_qty) * item.cost;
            }
        }
        return cost;
    };
    return StkCheckInputPage;
}());
StkCheckInputPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-stk-check-input',template:/*ion-inline-start:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\stk-check-input\stk-check-input.html"*/'<!--\n\n  盘点录入单\n\n  wudefeng\n\n  2017-05-12\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>盘点录入单</ion-title>   \n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-item>\n\n      <ion-label>单据编号</ion-label>\n\n      <ion-input [(ngModel)]="item.bill_no" disabled=true text-right></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>仓库</ion-label>\n\n      <ion-input [(ngModel)]="item.store_name"  placeholder="请选择仓库" readonly (click)="chooseStore()"  text-right>\n\n      </ion-input>     \n\n    </ion-item>\n\n\n\n    <ion-item-divider color="light">\n\n    </ion-item-divider>\n\n\n\n    <ion-item *ngFor="let obj of checkList" (click)="inputQty(obj)">\n\n      <ion-avatar item-left>\n\n        <img [src]="obj.img">\n\n      </ion-avatar>\n\n      <h3><span class="checklabel">品号：</span>{{obj.good_no}}</h3>\n\n      <h3><span class="checklabel">品称：</span>{{obj.good_name}}</h3>\n\n\n\n      <div item-right>\n\n        <p> <span class="checklabel">系统数量:</span>{{obj.stk_qty}}</p>\n\n        <p> <span class="checklabel">盘点数量:</span>{{obj.input_qty}}</p>\n\n      </div>\n\n\n\n    </ion-item>\n\n  </ion-list> \n\n  \n\n</ion-content>\n\n\n\n<ion-footer>\n\n\n\n  <ion-item color="light">\n\n    共盘点{{getInputCount()}}项,库存金额{{getTotalCost()}}\n\n    <button ion-button small item-right (click)="saveCheck()" *ngIf="isAdd">确认</button>\n\n    <button ion-button item-right outline color="primary" *ngIf="!isAdd">已审核</button>\n\n  </ion-item>\n\n\n\n</ion-footer>\n\n'/*ion-inline-end:"F:\FromNet\github\mygithub\demo\InvoiceApp\src\pages\work\stk-check-input\stk-check-input.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_sql_service__["a" /* SqlService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_util_service__["a" /* UtilService */],
        __WEBPACK_IMPORTED_MODULE_4__providers_stk_service__["a" /* StkService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
], StkCheckInputPage);

//# sourceMappingURL=stk-check-input.js.map

/***/ })

});
//# sourceMappingURL=11.main.js.map