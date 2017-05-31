import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Welcome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

    goToLogin(){
        this.navCtrl.setRoot('LoginPage');
    }

}