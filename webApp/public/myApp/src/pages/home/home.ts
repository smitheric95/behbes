import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormPage } from '../form/form';
import { MapPage } from '../map/map';
import { InfantHealthPage } from '../infanthealth/infanthealth';
import { AlarmsPage } from '../alarm/alarm';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['/pages/home/home.scss']
})
export class HomePage {


  constructor(public navCtrl: NavController) {

  }


  formTapped(event) {
    this.navCtrl.push(FormPage);
  }

  erTapped(event) {
    this.navCtrl.push(MapPage);
  }

  alarmTapped(event) {
    this.navCtrl.push(AlarmsPage);
  }

  basicsTapped(event) {
    this.navCtrl.push(InfantHealthPage);
  }


}
