import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormService } from '../../app/services/form/form.service';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-illness',
  templateUrl: 'illness.html'
})
export class IllnessPage {

  cause: Array<{about: string, 
    naturalTreatments: string, conventionalTreatments: string, resources: string }>;
  cause_name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formService: FormService) {
    this.cause = navParams.get('cause');
    this.cause_name = navParams.get('cause_name');
  }

  homeTapped(event) {
    this.navCtrl.push(HomePage);
  }

}
