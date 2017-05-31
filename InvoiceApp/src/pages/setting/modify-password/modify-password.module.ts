import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyPasswordPage } from './modify-password';

@NgModule({
    declarations: [
        ModifyPasswordPage,
    ],
    imports: [
        IonicPageModule.forChild(ModifyPasswordPage),
    ],
    exports: [
        ModifyPasswordPage
    ]
})
export class ModifyPasswordPageModule {}