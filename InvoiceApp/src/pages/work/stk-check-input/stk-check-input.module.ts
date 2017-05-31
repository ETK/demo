import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StkCheckInputPage } from './stk-check-input';

@NgModule({
    declarations: [
        StkCheckInputPage,
    ],
    imports: [
        IonicPageModule.forChild(StkCheckInputPage),
    ],
    exports: [
        StkCheckInputPage
    ]
})
export class StkCheckInputPageModule {}