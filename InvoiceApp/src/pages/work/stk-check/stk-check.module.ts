import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StkCheckPage } from './stk-check';

@NgModule({
    declarations: [
        StkCheckPage,
    ],
    imports: [
        IonicPageModule.forChild(StkCheckPage),
    ],
    exports: [
        StkCheckPage
    ]
})
export class StkCheckPageModule {}