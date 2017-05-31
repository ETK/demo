import { Component } from '@angular/core';

import {NavParams } from 'ionic-angular';

@Component({
  template: `
  <ion-list class="popover-page">
        <ion-item *ngFor="let item of menus">
            <button ion-button full icon-only (click)="item.handler($event)">
                {{item.title}}
            </button>
        </ion-item>
    </ion-list>
  `
})

export class propoverMenus{
    menus:Array<Object>;

    constructor(private navParams: NavParams) {
        this.menus = this.navParams.data.menus;
    }
}