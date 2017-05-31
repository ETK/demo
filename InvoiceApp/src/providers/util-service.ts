import {Injectable, NgZone} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout'
import {Headers, Http, URLSearchParams, RequestOptions} from '@angular/http';
import {Platform} from 'ionic-angular';
import {Toast} from '@ionic-native/toast';
import {AppVersion} from '@ionic-native/app-version';
import {LoadingController, AlertController, ActionSheetController} from 'ionic-angular';
import {Network} from '@ionic-native/network';
import {HTTP} from '@ionic-native/http';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {Storage} from '@ionic/storage';


/*
 Generated class for the UtilService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UtilService {
    loader: any;
    public loginUser:string = "";
    constructor(public http: Http,
                public plt: Platform,
                public toast: Toast,
                public appVersion: AppVersion,
                public loadingCtrl: LoadingController,
                public network: Network,
                public cordovaHttp: HTTP,
                public alertCtrl: AlertController,
                public sqlite: SQLite,
                public _ngZone: NgZone,
                public actionSheetCtrl: ActionSheetController,
                public storage: Storage) {
                    this.getByKey("userName").then(value=>{this.loginUser = value;});
    }

    /**
     * 平台(mobile和pc)
     * @returns {any}
     */
    getPlatform() {
        if (this.plt.is('ios') || this.plt.is('android')) {
            return 'mobile'
        } else {
            return 'pc'
        }
    }

    /**
     * 是否是android平台
     * @returns {boolean}
     */
    platformIsAndroid() {
        return this.getPlatform() == 'mobile' && this.plt.is('android');
    }

    /**
     * 是否是Ios平台
     * @returns {boolean}
     */
    platformIsIos() {
        return this.getPlatform() == 'mobile' && (this.plt.is('ios') || this.plt.is('ipad') || this.plt.is('iphone'));
    }

    /**
     * 请求头
     * @returns {any}
     */
    getUrlHead() {
        if (this.platformIsIos) {
            return 'http://localhost/';
        }
        if (this.platformIsAndroid) {
            //开发环境
            //return 'http://dev.blf1.belle.net.cn/';
            //测试环境
            return 'http://st.blf1.belle.net.cn/';
            //体验环境
            //return 'http://test.uc.belle.net.cn/';
            //生产环境
            //return 'http://blf1.belle.net.cn/';
        }

    }

    /**
     * 获取网络状态
     * @returns {string}
     */
    getNetwork() {
        let isOnline = this.network.type;
        return isOnline
    }

    /**
     * 判断是否有网络
     * @returns {boolean}
     */
    isConnecting(): boolean {
        return this.getNetwork() != 'none';
    }


    /**
     * 打印信息
     * (开发者调试chrome浏览器用iPhone模式，所以这个方法暂时这样)
     * @param mes
     */
    showToast(mes) {
        if (this.plt.is('android')) {
            this.toast.showShortBottom(mes).subscribe();
        } else {
            this.showAlert(mes);
            console.log(mes);
        }
    }

    /**
     * 本地storage操作 异步操作
     * @param key
     */
    getByKey(key: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.storage.ready().then(() => {
                this.storage.get(key).then((value) => {
                    resolve(value);
                }).catch(err => {
                    this.showToast(err);
                    reject(err);
                });
            })
        });
    }


    setByKey(key: any, value: any): Promise<any> {
        return new Promise(() => {
            this.storage.ready().then(() => {
                this.storage.set(key, value).then(() => {
                }).catch(err => {
                    this.showToast(err);
                });
            })
        });

    }

    removeByKey(key: any): Promise<any> {
        return new Promise(() => {
            this.storage.ready().then(() => {
                this.storage.remove(key).then(() => {
                }).catch(err => {
                    this.showToast(err);
                });
            })
        });
    }

    storageClear(): Promise<any> {
        return new Promise(() => {
            this.storage.ready().then(() => {
                this.storage.clear().then(() => {
                }).catch(err => {
                    this.showToast(err);
                });
            })
        });
    }


    /**
     * 解决Js浮点计算bug
     * @param month
     * @returns {string}
     */
    floatAdd(arg1, arg2) {
        let r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    }

    floatSub(arg1, arg2) {
        let r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    }

    floatMul(arg1, arg2) {
        let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {
        }
        try {
            m += s2.split(".")[1].length
        } catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    }

    floatDiv(arg1, arg2) {
        let t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length
        } catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length
        } catch (e) {
        }
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    }


    /**
     * App信息
     * @returns {Promise<any>}
     */
    getAppName(): Promise<string>{
        return new Promise((resolve, reject) => {
            this.appVersion.getAppName().then((value: string) => {
                resolve(value);
            }).catch(err => {
                reject(err);
            });
        });
    }

    getPackageName(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.appVersion.getPackageName().then((value: string) => {
                resolve(value);
            }).catch(err => {
                reject(err);
            });
        });
    }


    getVersionCode(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.appVersion.getVersionCode().then((value: string) => {
                resolve(value);
            }).catch(err => {
                reject(err);
            });
        });
    }

    getVersionNumber(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.appVersion.getVersionNumber().then((value: string) => {
                resolve(value);
            }).catch(err => {
                reject(err);
            });
        });
    }


    /**
     * 转换日期：2017-04-09
     * @param date
     * @returns {string}
     */
    formatDate(date) {
        let y: any = date.getFullYear();
        let m: any = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d: any = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    }

    /**
     * 获取当前时间：2017-04-09 09:34:09
     * @returns {string}
     */
    getNowFormatDate() {
        let date: any = new Date();
        let month: any = date.getMonth() + 1;
        let strDate: any = date.getDate();
        let h: any = date.getHours();
        let m: any = date.getMinutes();
        let s: any = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (h >= 0 && h <= 9) {
            h = "0" + h;
        }
        if (m >= 0 && m <= 9) {
            m = "0" + m;
        }
        if (s >= 0 && s <= 9) {
            s = "0" + s;
        }
        let currentdate: any = date.getFullYear() + "-" + month + "-" + strDate + " " + h + ":" + m + ":" + s;
        return currentdate;
    }

    /**
     * sqlite查询结果转换为数组
     * @param data
     * @returns {Array}
     */
    sqliteToArrqy(data) {
        let output = [];
        for (let i = 0; i < data.length; i++) {
            output.push(data.item(i));
        }
        return output;
    }

    /**
     * sqlite操作
     * @param sql
     * @param successCallBack
     */
    sqliteCustomSQL(sql, successCallBack) {
        this.sqlite.create({
            name: "data.db",
            location: "default"
        }).then((db: SQLiteObject) => {
            db.executeSql(sql, {}).then((res) => {
                successCallBack(res);
            }).catch(e => {
                this.showToast("Sql错误：" + e);
            });
        }).catch(e => {
            this.showToast("创建或打开数据库错误：" + e);
        });
    }

    /**
     * 强制刷新
     * @param dateFun
     */
    refreshUI(dateFun) {
        this._ngZone.run(() => {
            dateFun();
        });
    }


    /**
     * 网络请求
     * @param url 请求url
     * @param params   请求参数
     * @param timeout   超时时间
     * @param isShowLoading   是否显示加载框
     * @param successFun   成功返回回调
     *
     */
    httpPost1(url, params, timeout, isShowLoading, successFun) {
        if (!this.isConnecting()) {
            this.showToast("当前网络异常，请检查网络！");
            return;
        }
        let time;
        if (isShowLoading) {
            this.showLoading();
        }
        if (!timeout) {
            time = 10000;
        } else {
            time = timeout;
        }
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'});
        let options = new RequestOptions({headers: headers});
        this.http.post(url, this.buildURLSearchParams(params), options)
            .timeout(time)
            .map(res => res.json())
            .subscribe(data => {
                this.hideLoading();
                successFun(data);
            }, err => {
                this.hideLoading();
                //alert("请求失败:" + JSON.stringify(err));
                this.showToast("请求失败：" + JSON.stringify(err));
            });
    }

    httpPost(url: string, params: any, timeout: number = 10000, isShowLoading: boolean = true): Promise<any> {
        if (!this.isConnecting()) {
            this.showToast("当前网络异常，请检查网络！");
            return;
        }
        if (isShowLoading) {
            this.showLoading();
        }
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'});
        let options = new RequestOptions({headers: headers});
        return new Promise((resolve, reject) => {
            this.http.post(url, this.buildURLSearchParams(params).toString(), options)
                .timeout(timeout)
                .toPromise()
                .then((response) => {
                        this.hideLoading();
                        resolve(response.json());
                    }
                )
                .catch((err) => {
                    this.hideLoading();
                    let errStatus = err.status;
                    let errToast = errStatus + "-->" + err.statusText;
                    this.showToast(errToast);
                    //reject(err);
                });

        });
    }

    /**
     * http请求的参数
     * @param paramMap
     * @returns {URLSearchParams}
     */
    buildURLSearchParams(paramMap): URLSearchParams {
        let params = new URLSearchParams();
        if (!paramMap) {
            return params;
        }
        for (let key in paramMap) {
            let val = paramMap[key];
            params.set(key, val);
        }
        return params;
    }

    CordovaHttpPost(url, params, timeout, isShowLoading, successFun) {
        if (!this.isConnecting()) {
            this.showToast("当前网络异常，请检查网络！");
            return;
        }
        let time;
        if (isShowLoading) {
            this.showLoading();
        }
        if (!timeout) {
            time = 10000;
        } else {
            time = timeout;
        }
        this.cordovaHttp.post(url, params, {})
            .then(data => {
                this.hideLoading();
                successFun(data);
            })
            .catch(error => {
                this.hideLoading();
                //alert("请求失败:" + JSON.stringify(error));
                this.showToast("请求失败：" + JSON.stringify(error));
            });
    }

    httpGet(url, params, timeout, isShowLoading, successFun) {
        if (!this.isConnecting()) {
            this.showToast("当前网络异常，请检查网络！");
            return;
        }
        let time;
        if (isShowLoading) {
            this.showLoading();
        }
        if (!timeout) {
            time = 10000;
        } else {
            time = timeout;
        }

        this.http.get(url, {search: this.buildURLSearchParams(params).toString()})
            .timeout(time)
            .map(res => res.json())
            .subscribe(data => {
                this.hideLoading();
                successFun(data);
            }, err => {
                this.hideLoading();
                //alert("请求失败:" + JSON.stringify(err));
                this.showToast("请求失败：" + JSON.stringify(err));
            });
    }

    CordovaHttpGet(url, params, timeout, isShowLoading, successFun) {
        if (!this.isConnecting()) {
            this.showToast("当前网络异常，请检查网络！");
            return;
        }
        let time;
        if (isShowLoading) {
            this.showLoading();
        }
        if (!timeout) {
            time = 10000;
        } else {
            time = timeout;
        }
        this.cordovaHttp.get(url, params, {})
            .then(data => {
                this.hideLoading();
                successFun(data);
            })
            .catch(error => {
                this.hideLoading();
                //alert("请求失败:" + JSON.stringify(error));
                this.showToast("请求失败：" + JSON.stringify(error));
            });

    }

    /**
     *数据加载loading
     */
    showLoading() {
        this.loader = this.loadingCtrl.create({
            content: 'loading...',
            duration: 0
        });
        this.loader.present();
    }

    hideLoading() {
        if (this.loader) {
            this.loader.dismiss();
        }
    }


    /**
     * 提示框和确认框
     * @param title
     * @param template
     * @param confirmFun
     */
    showAlert(template: string, title ?: string, confirmFun ?) {
        if (!title) {
            title = '提示';
        }
        let alert = this.alertCtrl.create({
            title: title,
            message: template,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: '确认',
                    handler: () => {
                        if (typeof confirmFun == 'function') {
                            confirmFun();
                        }
                    }
                }
            ]
        });
        alert.present();
    }


    showConfirm(template: string, title ?: string, confirmFun ?) {
        if (!title) {
            title = '提示';
        }
        let alert = this.alertCtrl.create({
            title: title,
            message: template,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {}
                },
                {
                    text: '确认',
                    handler: () => {
                        if (typeof confirmFun == 'function') {
                            confirmFun();
                        }
                    }
                },

            ]
        });
        alert.present();
    }


    showPrompt(template: string, title: string, inputs: any, confirmFun) {
        let prompt = this.alertCtrl.create({
            title: title,
            message: template,
            enableBackdropDismiss: false,
            inputs: inputs,
            buttons: [
                {
                    text: '取消',
                    handler: () => {}
                },
                {
                    text: '确认',
                    handler: (data) => {
                        if (typeof confirmFun == 'function') {
                            confirmFun(data);
                            return data.flag;
                        }
                    }
                }
            ]
        });
        prompt.present();
    }


    /**
     * ActionSheet
     * @param text1
     * @param text2
     * @param text1Btn
     * @param text2Btn
     */
    showActionSheet(text1: string, text2: string, text1Btn, text2Btn) {
        const actionSheet = this.actionSheetCtrl.create({
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: text1,
                    role: text1,
                    handler: () => {
                        if (typeof text1Btn == 'function') {
                            text1Btn();
                        }
                    }
                },
                {
                    text: text2,
                    role: text2,
                    handler: () => {
                        if (typeof text2Btn == 'function') {
                            text2Btn();
                        }
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {}
                }
            ]
        });
        actionSheet.present();

    }


}
