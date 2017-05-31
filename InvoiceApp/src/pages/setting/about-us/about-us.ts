import {Component} from '@angular/core';
import {IonicPage,NavController, NavParams} from 'ionic-angular';
import {UtilService} from '../../../providers/util-service';
import {SqlService} from "../../../providers/sql-service";

/*
 Generated class for the AboutUs page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
declare let window;
@IonicPage()
@Component({
    selector: 'page-about-us',
    templateUrl: 'about-us.html'
})
export class AboutUsPage {
    app: any = {};
    company: any = {};
    hrefUrl:string;


    constructor(public navCtrl: NavController,
                private sqlService: SqlService,
                private  utilService: UtilService,
                public navParams: NavParams) {

    }

    ionViewDidLoad() {
        let versionNumber;
        let envir;
        if (this.utilService.getPlatform() == 'pc') {
            versionNumber = '0.0.1';
            envir = '测试环境';
        } else {
             this.utilService.getVersionNumber().then((result)=>{
                 this.app = {
                     versionNumber: result,
                     envir: '测试环境'
                 }
            });
        }



        this.company = {
            phone: '18503078587',
            qq: '3033389165',
            addr: '广东省深圳市龙华新区华宁西路97号'
        }
        //tencent://message/?uin=3033389165&site=qq&menu=yes
        this.hrefUrl="http://wpa.qq.com/msgrd?v=3&uin='"+this.company.qq+"'&site=qq&menu=yes";
        //this.hrefUrl="tencent://message/?uin='"+this.company.qq+"'&site=qq&menu=yes";
    }

    callPhone(passedNumber){
        window.location = passedNumber;
    }


}
