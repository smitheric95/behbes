import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormService } from '../../app/services/form/form.service';

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  symptomsList: any[];
  symptoms: any[];
  selected: any[];

  constructor(public navCtrl: NavController, private formService: FormService) {
    this.symptomsList = [
      "Coughing",
      "Exsessive Crying",
      "Decreased Appetite",
      "Diarrhea",
      "Dry Flaky Scalp",
      "Excess Tearing",
      "Fever",
      "Irritibility",
      "Not Peed for > 6 Hours",
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
    this.formService.postForm(this.selected);

  }

  async getSymptoms() {
    this.symptomsList = await this.formService.getSymptoms();
    this.createSymptomsObj();
  }


  createSymptomsObj() {
    for (let symptom of this.symptomsList) {
      this.symptoms.push({name: symptom, value: false});
    }
  }

}