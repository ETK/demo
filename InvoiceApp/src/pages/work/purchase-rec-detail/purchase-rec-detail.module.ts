import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseRecDetailPage } from './purchase-rec-detail';

@NgModule({
    declarations: [
        PurchaseRecDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(PurchaseRecDetailPage),
    ],
    exports: [
        PurchaseRecDetailPage
    ]
})
export class PurchaseRecDetailPageModule {}