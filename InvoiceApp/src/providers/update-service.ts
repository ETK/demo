import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {UtilService} from './util-service';
import {AlertController} from 'ionic-angular';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {File} from '@ionic-native/file';


/*
 Generated class for the UpdateService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UpdateService {
    serverAppVersion: string;//服务器上的版本
    currentVersion: string;//当前版本

    constructor(private utilService: UtilService,
                private alertCtrl: AlertController,
                private transfer: Transfer,
                private file: File) {
    }

    testHttp() {
        const url1 = this.utilService.getUrlHead() + 'bl-appuc-web/login.json';
        let params1 = {
            'username': 'admin',
            'password': '123456'
        };
        this.utilService.httpPost(url1, params1).then(data => {
            alert(JSON.stringify(data));
        })

    }

    /**
     * 检查是否有更新
     */
    checkUpdate(flag?:string) {
        if (this.utilService.getPlatform() == 'pc') {
            return;
        }
        this.utilService.getVersionNumber().then(data => {
            this.currentVersion = data;
        });
        const url = this.utilService.getUrlHead() + 'bl-appuc-web/app_version/check.json';
        let params = {'currentVersion': this.currentVersion};
        this.utilService.httpPost(url, params, 100000, true).then((data) => {
            console.log(data);
            let mes = "更新:<br/>1.优化库存详细查询  添加名称查询、分页<br/>2.其他入库单 皮料退料支持输出批次号<br/>3.其他一些优化及bug修";
            if (data.flag.retCode == 'update') {
                //有更新
                this.serverAppVersion = data.flag.retDetail;
                this.utilService.showConfirm(mes, '升级', () => {
                    this.downloadApk();
                });
            }else{
                if(flag){
                    this.utilService.showToast("当前已是最新版本");

                }

            }
        })
    }

    /**
     * 下载apk
     */
    downloadApk() {
        if (this.utilService.platformIsAndroid) {
            //android
            let alertToast = this.alertCtrl.create({
                title: '下载进度：0%',
                enableBackdropDismiss: false,
            });
            alertToast.present();
            const fileTransfer: TransferObject = this.transfer.create();
            const apkUrl = this.file.externalRootDirectory + 'android.apk'; //apk保存的目录
            const downloadUrl = this.utilService.getUrlHead() + 'bl-appuc-web/app_version/download?filename=' + this.serverAppVersion;
            fileTransfer.download(downloadUrl, apkUrl, true).then((entry) => {
                //这里打开app
                window['install'].install(apkUrl.replace('file://', ''));
            }, (error) => {
                // handle error
                alertToast.dismiss();
                this.utilService.showAlert("下载失败!" + JSON.stringify(error));
            });

            fileTransfer.onProgress((event: ProgressEvent) => {
                let num = Math.floor(event.loaded / event.total * 100);
                if (num === 100) {
                    alertToast.dismiss();
                } else {
                    let title = document.getElementsByClassName('alert-title')[0];
                    title && (title.innerHTML = '已经下载：' + num + '%');
                }
            });

        } else if (this.utilService.platformIsIos) {
            //ios

        }


    }

}
