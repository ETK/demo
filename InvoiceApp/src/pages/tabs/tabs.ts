import {Component, ViewChild} from '@angular/core';
import {IonicPage,Tabs} from "ionic-angular";
import {UtilService} from '../../providers/util-service';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    tabBadgeNum:string;
    // this tells the tabs component which Pages
    // should be each tab's root Page
    @ViewChild('mainTabs') tabs: Tabs;//加这句以及引用两个模块
    tab1Root: any = 'WorkPage';
    tab2Root: any = 'ReportPage';
    tab3Root: any = 'AlarmPage';
    tab4Root: any = 'SettingPage';

    constructor( private utilService: UtilService) {

        this.utilService.getByKey('alarmFlag').then((alarmFlag)=>{
            if(alarmFlag){
                this.tabBadgeNum='23';
            }else{
                this.tabBadgeNum='';
            }

        })

    }
}
