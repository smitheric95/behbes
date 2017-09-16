import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormService } from '../../app/services/form/form.service';

import { CausesPage } from '../causes/causes';

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  symptomsList: any[];
  symptoms: any[];
  selected: any[];
  response: any[];

  constructor(public navCtrl: NavController, private formService: FormService) {
    this.symptomsList = [
      "Coughing",
      "Exsessive Crying",
      "Decreased Appetite",
      "Diarrhea",
      "Dry Flaky Scalp",
      "Excess Tearing",
      "Fever",
      "Irritability",
      "Not Peed for >6 Hours",
      "Not Pooping",
      "Nasal Congestion",
      "Pulling on Ears",
      "Rash (body)",
      "Rash (diaper area)",
      "Runny nose",
      "Sneezing",
      "Small/tiny red or white bumps on nose, cheeks, or forehead",
      "Twitching",
      "Vomiting",
      "White patches on lips, tongue, inside cheeks",
      "Yellow/orange looking skin"
    ]

    this.symptoms = [];
    this.selected = [];
    this.response = [];
  }

  ngOnInit() {
     this.getSymptoms();
  }

  async postForm() {

    var filteredS
    filteredS = this.symptoms.filter(val => val.value);
    for (let symptom of filteredS) {
      this.selected.push(symptom.name);
    }
    
    Promise.all(this.response = await this.formService.postForm(this.selected))
      .then(value => this.pushPage())
  }

  pushPage() {
    this.navCtrl.push(CausesPage, {
      response: this.response
    });
  } 

   async getSymptoms() {
    /*this.symptomsList = await this.formService.getSymptoms();*/
    this.createSymptomsObj();
  }
 

  createSymptomsObj() {
    var order: 0
    for (let symptom of this.symptomsList) {
      this.symptoms.push({name: symptom, value: false,id: order});
    }
  }

}