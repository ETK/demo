import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';
import { UtilService } from '../../providers/util-service';

import { SqlService } from '../../providers/sql-service';

@IonicPage()
@Component({
    selector: 'page-alarm',
    templateUrl: 'alarm.html',
})
export class AlarmPage {
   
    constructor(public navCtrl: NavController, data: UtilService, public sqlservice: SqlService) {       
    }
  
}
