import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseGoodsPage } from './choose-goods';

@NgModule({
    declarations: [
        ChooseGoodsPage,
    ],
    imports: [
        IonicPageModule.forChild(ChooseGoodsPage),
    ],
    exports: [
        ChooseGoodsPage
    ]
})
export class ChooseGoodsPageModule {}