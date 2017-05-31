import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UtilService} from '../../providers/util-service';
import {SqlService} from '../../providers/sql-service';
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    loginText: string;
    user: any = {};

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private sqlService: SqlService,
                private util: UtilService) {
        this.loginText = "登录";
        this.util.getByKey("userName").then((userName) => {
            this.user.userName = userName;
        });
        this.util.getByKey("passWord").then((passWord) => {
            this.user.passWord = passWord;
        });
        //初始化一个用户
        this.initUser();

    }

    initUser() {
        this.sqlService.initUserData();
    }


    loginClick() {
        if (!this.user.userName || !this.user.passWord) {
            this.util.showToast("用户名或者密码不能为空");
        } else {
            let condition = "username='" + this.user.userName + "'and password='" + this.user.passWord + "'";
            this.sqlService.query('user', condition).then((data) => {
                if (data.res.rows.length <= 0) {
                    this.util.showToast("用户名或者密码错误");
                } else {
                    let array = this.util.sqliteToArrqy(data.res.rows);
                    this.util.setByKey('userName', array[0].username);
                    this.util.setByKey('userNo', array[0].user_no);
                    this.util.setByKey('userAvavar', array[0].img);
                    this.util.setByKey('passWord', array[0].password);
                    this.util.loginUser = array[0].username;
                    this.navCtrl.push('TabsPage');
                }
            }).catch((err) => {
                console.error(err);
            })
        }

    }

}

