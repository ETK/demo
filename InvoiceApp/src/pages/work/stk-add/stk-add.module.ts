import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StkAddPage } from './stk-add';

@NgModule({
    declarations: [
        StkAddPage,
    ],
    imports: [
        IonicPageModule.forChild(StkAddPage),
    ],
    exports: [
        StkAddPage
    ]
})
export class StkAddPageModule {}