import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseOrderListPage } from './purchase-order-list';

@NgModule({
    declarations: [
        PurchaseOrderListPage,
    ],
    imports: [
        IonicPageModule.forChild(PurchaseOrderListPage),
    ],
    exports: [
        PurchaseOrderListPage
    ]
})
export class PurchaseOrderListPageModule {}