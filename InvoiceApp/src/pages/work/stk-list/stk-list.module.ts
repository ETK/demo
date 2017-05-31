import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StkListPage } from './stk-list';

@NgModule({
    declarations: [
        StkListPage,
    ],
    imports: [
        IonicPageModule.forChild(StkListPage),
    ],
    exports: [
        StkListPage
    ]
})
export class StkListPageModule {}