import {Component} from '@angular/core';
import {IonicPage,NavController, NavParams, App} from 'ionic-angular';

import {UtilService} from '../../../providers/util-service';
import {SqlService} from "../../../providers/sql-service";


/*
 Generated class for the ModifyPassword page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-modify-password',
    templateUrl: 'modify-password.html'
})
export class ModifyPasswordPage {
    user: any = {};
    userNo: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private app: App,
                private sqlService: SqlService,
                private  utilService: UtilService) {
        this.userNo = navParams.get('userNo');
    }

    save() {
        if (!this.user.oldPassword || !this.user.newPassword || !this.user.new2Password) {
            this.utilService.showToast("密码不能为空");
        } else if (this.user.newPassword != this.user.new2Password) {
            this.user.newPassword = '';
            this.user.new2Password = '';
            this.utilService.showToast("2次密码不一样");
        } else if (this.user.oldPassword === this.user.newPassword) {
            this.user.newPassword = '';
            this.user.new2Password = '';
            this.utilService.showToast("新密码不能和原密码一样");
        } else {
            this.utilService.getByKey("passWord").then((passWord) => {
                if (this.user.oldPassword != passWord) {
                    this.utilService.showToast("原密码错误");
                } else {
                    //请求接口修改密码
                    this.modifyPwdFun();
                }

            })
        }

    }

    modifyPwdFun() {
        let sql = "update user set password='" + this.user.new2Password + "' where user_no='" + this.userNo + "'";
        this.sqlService.execSql(sql, []).then(() => {
            this.utilService.removeByKey('passWord').then(()=>{
                this.utilService.showToast("修改成功!");
                setTimeout(()=>{
                    this.app.getRootNav().setRoot('LoginPage');
                },500);

            })
        }).catch((err) => {
            console.error(err);
        });

    }


}
