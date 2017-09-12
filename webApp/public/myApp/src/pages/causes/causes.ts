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
  cause: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private formService: FormService) {
    this.causes = navParams.get('response');
    this.cause = [];
  }


  //sends the other possible causes to return to this page
  async causeTapped(event, cause_name) {

    Promise.all(this.cause = await this.formService.getIllness(cause_name))
      .then(value => this.pushPage(cause_name));
  }

  pushPage(cause_name) {
    this.navCtrl.push(IllnessPage, {
      cause: this.cause,
      cause_name: cause_name
    });
  }
}
