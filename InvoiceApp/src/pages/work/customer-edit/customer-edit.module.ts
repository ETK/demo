import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerEditPage } from './customer-edit';

@NgModule({
    declarations: [
        CustomerEditPage,
    ],
    imports: [
        IonicPageModule.forChild(CustomerEditPage),
    ],
    exports: [
        CustomerEditPage
    ]
})
export class CustomerEditPageModule {}