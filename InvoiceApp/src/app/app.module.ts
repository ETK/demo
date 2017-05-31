import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';


/*Pages*/
import { MyApp } from './app.component';
import {orderManage} from '../pages/order/order';
import {salesOrderList} from '../pages/order/salesOrder/list';
import {salesOrderDetail} from '../pages/order/salesOrder/detail';
import {materiel} from '../pages/order/materiel/materiel';
/*component*/
import {selectMateriel} from '../component/select-materiel';
import {gridComponentControl} from '../component/grid-component';
import {propoverMenus} from '../component/popover-menus';
import {baseEditPage} from '../pages/baseEditPage/baseEditPage';
import {baseEditItemPage} from '../pages/baseEditPage/baseEditItemPage';
import {orderItems} from '../pages/order/item';

/*Services*/
import { UtilService } from '../providers/util-service';
import { CONSTANT } from '../providers/constants';
import { UpdateService } from '../providers/update-service';
import { SqlService } from '../providers/sql-service';
import { CustomerService } from '../providers/customer-service';
import { SupplierService } from '../providers/supplier-service';
import { StkService } from '../providers/stk-service';
import { UtilJson } from '../providers/util-json';
/*Plugins*/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Toast } from '@ionic-native/toast';
import { SQLite } from '@ionic-native/sqlite';
import { MyErrorHandler } from '../providers/my-error-handler';
import { AppVersion } from '@ionic-native/app-version';
import { Network } from '@ionic-native/network';
import { HTTP } from '@ionic-native/http';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Contacts } from '@ionic-native/contacts';

@NgModule({
    declarations: [
        MyApp,
		orderManage,
        materiel,
        selectMateriel,
        salesOrderList,
        salesOrderDetail,
        gridComponentControl,
        propoverMenus,
        baseEditPage,
        baseEditItemPage,
        orderItems,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '返回',//修改返回文字
            tabsHideOnSubPages: 'true', //隐藏全部子页面tabs
            iconMode: 'ios',//在应用程序中为所有图标使用的模式。 可用选项：“ios”，“md”
            mode: 'ios',//在应用程序中使用的模式。(解决title不居中显示，返回文字和图片不对齐问题)
            tabsHighlight: 'true',//高亮当前选中tab
            pageTransition: 'ios-transition'
        }),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
	    orderManage,
        salesOrderList,
        salesOrderDetail,
        materiel,
        gridComponentControl,
        propoverMenus,
        baseEditPage,
        baseEditItemPage,
        orderItems,
    ],
    providers:  [
        StatusBar,
        SplashScreen,
        IonicStorageModule,
        Toast,
        SQLite,
        UtilService,
        AppVersion,
        Network,
        HTTP,
        ImagePicker,
        SqlService,
        StkService,
        CustomerService,
        SupplierService,
        Camera,
        CONSTANT,
        UpdateService,
        Transfer,
        File,
        Contacts,
		UtilJson,
        { provide: ErrorHandler, useClass: MyErrorHandler }
    ]
})
export class AppModule {
}
