import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormService } from '../../app/services/form/form.service';

@Component({
  selector: 'page-causes',
  templateUrl: 'causes.html'
})
export class CausesPage {

  constructor(public navCtrl: NavController, private formService: FormService) {

  }

  formTest;

  async getTest() {

    this.formTest = await this.formService.getForm();
  }

}