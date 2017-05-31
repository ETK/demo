import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseOrderDetailPage } from './purchase-order-detail';

@NgModule({
    declarations: [
        PurchaseOrderDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(PurchaseOrderDetailPage),
    ],
    exports: [
        PurchaseOrderDetailPage
    ]
})
export class PurchaseOrderDetailPageModule {}