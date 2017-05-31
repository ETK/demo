import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferDetailPage} from './transfer-detail';

@NgModule({
    declarations: [
        TransferDetailPage
    ],
    imports: [
        IonicPageModule.forChild(TransferDetailPage)      
    ],
    exports: [
        TransferDetailPage
    ]
})
export class TransferDetailPageModule { }
