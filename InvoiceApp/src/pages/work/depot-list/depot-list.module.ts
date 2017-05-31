import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepotListPage } from './depot-list';

@NgModule({
    declarations: [
        DepotListPage,
    ],
    imports: [
        IonicPageModule.forChild(DepotListPage),
    ],
    exports: [
        DepotListPage
    ]
})
export class DepotListPageModule {}