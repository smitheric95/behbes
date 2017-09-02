import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormService } from '../../app/services/form/form.service';

@Component({
  selector: 'page-causes',
  templateUrl: 'causes.html'
})
export class CausesPage {

    ratings: string[];
    causes: string[];
  constructor(public navCtrl: NavController, private formService: FormService) {
        this.ratings = ['4/5','3/5','2/5','1/5'];
        this.causes = ['Blah', 'Blah2','Blah3','Blah4'];
  }

  formTest;

  async getTest() {

    this.formTest = await this.formService.getForm();
  }

}