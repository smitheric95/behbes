import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormService } from '../../app/services/form/form.service';

import { IllnessPage } from '../illness/illness';

@Component({
  selector: 'page-causes',
  templateUrl: 'causes.html',
  styleUrls: ['/pages/causes/cause.scss'],
})
export class CausesPage {
  
  causes: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private formService: FormService) {
    /* name and count */
    this.causes = navParams.get('response');
  }

  //sends the other possible causes to return to this page
  causeTapped(event, cause_name) {
    this.pushPage(cause_name);
  }

  pushPage(cause_name) {
    this.navCtrl.push(IllnessPage,{Name: cause_name});
  }
}
