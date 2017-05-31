import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StkLogListPage } from './stk-log-list';

@NgModule({
    declarations: [
        StkLogListPage,
    ],
    imports: [
        IonicPageModule.forChild(StkLogListPage),
    ],
    exports: [
        StkLogListPage
    ]
})
export class StkLogListPageModule {}