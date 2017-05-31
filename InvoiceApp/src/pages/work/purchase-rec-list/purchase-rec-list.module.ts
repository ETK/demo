import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseRecListPage } from './purchase-rec-list';

@NgModule({
    declarations: [
        PurchaseRecListPage,
    ],
    imports: [
        IonicPageModule.forChild(PurchaseRecListPage),
    ],
    exports: [
        PurchaseRecListPage
    ]
})
export class PurchaseRecListPageModule {}