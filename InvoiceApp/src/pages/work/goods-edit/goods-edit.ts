import {Component} from '@angular/core';
import {IonicPage,NavController, NavParams} from 'ionic-angular';
import {UtilService} from '../../../providers/util-service';
import {ImagePicker} from '@ionic-native/image-picker';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {SqlService} from "../../../providers/sql-service";


/*
 Generated class for the GoodsEdit page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-goods-edit',
    templateUrl: 'goods-edit.html'
})
export class GoodsEditPage {
    obj: any;
    item: any;
    flag: number;
    titleText: string;
    isCreatorShow:boolean;
    isDoodNoDisabled:boolean;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private util: UtilService,
                private imagePicker: ImagePicker,
                private camera: Camera,
                private sqlService: SqlService) {
        this.item = this.navParams.get('item');
        if (this.item) {
            //编辑
            this.flag = 1;
            this.titleText = '编辑';
            this.isCreatorShow=false;
            this.isDoodNoDisabled=true;
            this.obj = this.item;
        } else {
            //添加
            this.obj = {};
            this.titleText = '添加';
            this.isCreatorShow=true;
            this.isDoodNoDisabled=false;
            this.flag = 2;
        }
    }

    modifyPic() {
        this.util.showActionSheet('拍照', '相册', () => {
            this.cameraFun();
        }, () => {
            this.imagePickerFun();
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
            this.util.refreshUI(() => {
                this.obj.img = imageData;
            });
        }, (err) => {
            // Handle error
            this.util.showToast(err);
        });

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
                this.obj.img = results[i];
            }
        }, (err) => {
            this.util.showToast(err);
        });

    }

    save() {
        if (!this.obj.good_no || !this.obj.good_name || !this.obj.purchase_price || !this.obj.sale_price || !this.obj.mini_safe_num || !this.obj.max_safe_num) {
            this.util.showToast("请注意查看必填信息");
            return;
        }
        if (!this.obj.cost_price) {
            //当没有输入成本价时，成本价等于进价
            this.obj.cost_price = this.obj.purchase_price;

        } else {
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

    }

    addToSqlite(){
        this.util.getByKey('userName').then((result) => {
            this.obj.creator = result;
            this.obj.create_time=this.util.getNowFormatDate();
            this.sqlService.save('good', this.obj).then(() => {
                this.navCtrl.pop();
            }).catch((err) => {
                console.error(err);
            });
        });
    }
}
