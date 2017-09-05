import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormService } from '../../app/services/form/form.service';

@Component({
  selector: 'page-causes',
  templateUrl: 'causes.html'
})
export class CausesPage {
  /*
  cause: Array<{about: string, 
    naturalTreatments: string, conventionalTreatments: string, resources: string }>;*/
  causes: any[];

  constructor(public navCtrl: NavController, public navParams, private formService: FormService) {
    this.causes = navParams.get('causes');
  }



  //sends the other possible causes to return to this page
  /*causeTapped(event, causes, name) {
    /*this.navCtrl.push(IllnessPage/name, {
      causes: causes
    });
}*/
}
