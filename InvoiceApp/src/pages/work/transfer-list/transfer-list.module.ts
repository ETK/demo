import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferListPage } from './transfer-list';

@NgModule({
    declarations: [
        TransferListPage,
    ],
    imports: [
        IonicPageModule.forChild(TransferListPage),
    ],
    exports: [
        TransferListPage
    ]
})
export class TransferListPageModule {}