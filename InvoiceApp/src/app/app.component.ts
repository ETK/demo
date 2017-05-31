import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, IonicApp, ToastController, Keyboard } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { UtilService } from '../providers/util-service';
import { SqlService } from '../providers/sql-service';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;
    backButtonPressed: boolean = false;  //用于判断返回键是否触发   

    @ViewChild('myNav') nav: Nav;

    constructor(public platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        public ionicApp: IonicApp,
        public toastCtrl: ToastController,
        public util: UtilService,
        public keyboard: Keyboard,
        public sqlHelp: SqlService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            this.init();
            this.sqlHelp.createTable();
            this.registerBackButtonAction();//注册返回按键事件
        });
    }

    init() {
        this.util.getByKey('firstIn').then((result) => {
            if (result) {
                this.rootPage ='LoginPage';
            } else {
                this.util.setByKey('firstIn', true);
                this.rootPage ='WelcomePage';
            }
        })
    }


    registerBackButtonAction() {
        this.platform.registerBackButtonAction(() => {
            if (this.keyboard.isOpen()) {
                //按下返回键时，先关闭键盘
                this.keyboard.close();
                return;
            };
            //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
            // this.ionicApp._toastPortal.gaetActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
            //不写this.ionicApp._toastPortal.getActive()是因为连按2次退出
            let activePortal = this.ionicApp._modalPortal.getActive() ||this.ionicApp._overlayPortal.getActive();
            let loadingPortal = this.ionicApp._loadingPortal.getActive();
            if (activePortal) {
                //其他的关闭
                activePortal.dismiss().catch(() => {
                });
                activePortal.onDidDismiss(() => {
                });
                return;
            }
            if (loadingPortal) {
                //loading的话，返回键无效
                return;
            }
            let activeVC = this.nav.getActive();
            let page = activeVC.instance;

            if (page instanceof LoginPage || page instanceof WelcomePage) {
                this.platform.exitApp();
                return;
            }
            let tabs = activeVC.instance.tabs;
            let activeNav = tabs.getSelected();
            return activeNav.canGoBack() ? activeNav.pop() : this.showExit();//另外两种方法在这里将this.showExit()改为其他两种的方法的逻辑就好。
        }, 1);
    }

    //双击退出提示框
    showExit() {
        if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
            this.platform.exitApp();
        } else {
            this.toastCtrl.create({
                message: '再按一次退出应用',
                duration: 2000,
                position: 'bottom',
                cssClass: 'text-align: center'
            }).present();
            this.backButtonPressed = true;
            setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
        }
    }


}
