import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemoListPage } from './demo-list';

@NgModule({
    declarations: [
        DemoListPage,
    ],
    imports: [
        IonicPageModule.forChild(DemoListPage),
    ],
    exports: [
        DemoListPage
    ]
})
export class DemoListPageModule {}