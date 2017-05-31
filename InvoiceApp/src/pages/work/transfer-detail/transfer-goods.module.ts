import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferGoodsPage} from './transfer-goods';

@NgModule({
    declarations: [       
        TransferGoodsPage
    ],
    imports: [
        IonicPageModule.forChild(TransferGoodsPage)
    ],
    exports: [     
        TransferGoodsPage
    ]
})
export class TransferGoodsPageModule { }


