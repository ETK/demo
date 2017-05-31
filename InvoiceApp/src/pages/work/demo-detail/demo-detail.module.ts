import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemoDetailPage } from './demo-detail';

@NgModule({
    declarations: [
        DemoDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(DemoDetailPage),
    ],
    exports: [
        DemoDetailPage
    ]
})
export class DemoDetailPageModule {}