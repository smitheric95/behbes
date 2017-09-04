import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormService } from '../../app/services/form/form.service';

@Component({
  selector: 'page-list',
  templateUrl: 'form.html',
})
export class FormPage {

  symptoms: any[];
  selected: any[];

  constructor(public navCtrl: NavController, private formService: FormService) {
    this.symptoms = [
      { name: "Coughing", value: false },
      { name: "Exsessive Crying", value: false },
      { name: "Decreased Appetite", value: false },
      { name: "Diarrhea", value: false },
      { name: "Dry Flaky Scalp", value: false },
      { name: "Excess Tearing", value: false },
      { name: "Fever", value: false },
      { name: "Irritibility", value: false },
      { name: "Not Peed for > 6 Hours", value: false },
      { name: "Not Pooping", value: false },
      { name: "Nasal Congestion", value: false },
      { name: "Pulling on Ears", value: false },
      { name: "Rash (body)", value: false },
      { name: "Rash (diaper area)", value: false },
      { name: "Runny nose", value: false },
      { name: "Sneezing", value: false },
      { name: "Small/tiny red or white bumps on nose, cheeks, or forehead", value: false },
      { name: "Twitching", value: false },
      { name: "Vomiting", value: false },
      { name: "White patches on lips, tongue, inside cheeks", value: false },
      { name: "Yellow/orange looking skin", value: false }
    ]


    this.selected = [];
  }

  ngOnInit() {
    this.getSymptoms();
  }

  async postForm() {

    this.formService.postForm(this.symptoms.filter(val => val.value));

  }

  async getSymptoms() {
    this.symptoms = await this.formService.getSymptoms()
  }

}
