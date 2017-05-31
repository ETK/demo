import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsEditPage } from './goods-edit';

@NgModule({
    declarations: [
        GoodsEditPage,
    ],
    imports: [
        IonicPageModule.forChild(GoodsEditPage),
    ],
    exports: [
        GoodsEditPage
    ]
})
export class GoodsEditPageModule {}