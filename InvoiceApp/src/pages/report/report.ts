import { Component } from '@angular/core';
import { IonicPage,NavController, Platform } from 'ionic-angular';
import { UtilService } from '../../providers/util-service';

@IonicPage()
@Component({
    selector: 'page-report',
    templateUrl: 'report.html'
})
export class ReportPage {

    rptType: string = "sale";
   
    selectedIndex: number = 0; 

    rptArray: any[] = [{
        rptType: 'sale',
        rptName: '销售报表'
    }, {
        rptType: 'purchase',
        rptName: '采购报表'
    }, {
        rptType: 'stk',
        rptName: '库存报表'
    }];

    constructor(platform: Platform, public navCtrl: NavController, private utilService: UtilService) {

    }

    titleClick(rpt,index) {
        this.rptType = rpt.rptType;
        this.selectedIndex = index;
    }
}