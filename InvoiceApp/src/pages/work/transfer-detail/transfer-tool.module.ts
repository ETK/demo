import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TransferToolPage} from './transfer-tool';

@NgModule({
    declarations: [      
        TransferToolPage
    ],
    imports: [
        IonicPageModule.forChild(TransferToolPage)
    ],
    exports: [       
        TransferToolPage
    ]
})
export class TransferToolPageModule { }