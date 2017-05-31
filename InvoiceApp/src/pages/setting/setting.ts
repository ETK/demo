import {Component} from '@angular/core';
import {ImagePicker} from '@ionic-native/image-picker';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {IonicPage,NavController, Platform} from 'ionic-angular';
import {UtilService} from '../../providers/util-service';
import {SqlService} from '../../providers/sql-service';
import {UpdateService} from '../../providers/update-service';
import {ActionSheetController} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-setting',
    templateUrl: 'setting.html'
})
export class SettingPage {
    user: any = {};
    isMesChecked:boolean;

    constructor(public navCtrl: NavController,
                private utilService: UtilService,
                private sqlService: SqlService,
                private imagePicker: ImagePicker,
                private actionSheetCtrl: ActionSheetController,
                private camera: Camera,
                private updateService: UpdateService,
                private platform: Platform) {
        this.initData();
    }

    initData() {
        this.utilService.getByKey('userName').then((result) => {
            this.user.username = result;
        });
        let date = new Date();
        this.user.loginTime = this.utilService.formatDate(date);
        this.utilService.getByKey('userNo').then((result) => {
            this.user.userNo = result;
        });
        this.utilService.getByKey('userAvavar').then((result) => {
            this.user.avatarUrl = result;
        });
        this.utilService.getByKey('alarmFlag').then((result) => {
            this.isMesChecked = result;
        });


    }

    modifyAvatar() {
        //修改头像
        const actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: '拍照',
                    role: '拍照',
                    handler: () => {
                        this.cameraFun();
                    }
                },
                {
                    text: '相册',
                    role: '相册',
                    handler: () => {
                        this.imagePickerFun();
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();


    }

    imagePickerFun() {
        let imagePickerOpt = {
            maximumImagesCount: 1,//选择一张图片
            width: 200,
            height: 200,
            quality: 100
        };
        this.imagePicker.getPictures(imagePickerOpt).then((results) => {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
                this.user.avatarUrl = results[i];
                this.addImg(results[i]);
            }
        }, (err) => {
            this.utilService.showToast(err);
        });

    }

    cameraFun() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            // let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.utilService.refreshUI(() => {
                this.user.avatarUrl = imageData;
                this.addImg(imageData);
            });
        }, (err) => {
            // Handle error
            this.utilService.showToast(err);
        });

    }

    addImg(imageData) {
        let sql = "update user set img='" + imageData + "' where user_no='" + this.user.userNo + "'";
        this.sqlService.execSql(sql, []);
    };

    changeToggle(event) {
        this.utilService.setByKey('alarmFlag',event.checked);
    };

    modifyPassword() {
        //修改密码
        this.navCtrl.push('ModifyPasswordPage', {'userNo': this.user.userNo});
    };

    clearCache() {
        //清除缓存
        /**
         * 1.storge :暂时不能清除登录用户的信息
         * 2.否则，只能在这里退出app
         */
        /*  this.utilService.storageClear().then(()=>{
         setTimeout(()=>{
         this.utilService.showToast("数据清除成功");
         },500)
         }
         );*/

        this.utilService.showConfirm('是否清楚所有本地数据?', '清除数据', () => {
            this.utilService.showLoading();
            this.sqlService.dropTable(true);
           /* setTimeout(() => {
                this.sqlService.initUserData();
                this.sqlService.initBaseData();

            }, 1000)*/
            setTimeout(() => {
                this.utilService.hideLoading();
                this.utilService.showToast("数据清除成功");
            }, 2000)

        })

    };



    updateApp() {
        //检查更新
        //this.updateService.checkUpdate('setting');
    };

    aboutAs() {
        //关于我们
        this.navCtrl.push('AboutUsPage');
    };

    logOut() {
        //退出登录
        if (this.utilService.getPlatform() == 'mobile') {
            this.utilService.showConfirm('是否退出本应用?', '退出', () => {
                this.utilService.removeByKey('passWord');
                this.utilService.removeByKey('userName');
                this.platform.exitApp();
            })
        }

    };


}
