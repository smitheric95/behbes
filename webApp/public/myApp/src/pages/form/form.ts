import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormService } from '../../app/services/form/form.service';

import { CausesPage } from '../causes/causes';

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
  styleUrls: ['/pages/form/form.scss'],
})
export class FormPage {

  symptomsList: any;

  symptoms: any[];
  selected: any[];
  response: any[];

  constructor(public navCtrl: NavController, private formService: FormService) {
    /*     this.symptomsList = [
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
        ] */

    this.symptomsList = [
      {
        //abnormList:
        list:
        [
          { name: "Twitching", value: false },
          { name: "Exsessive Crying", value: false },
          { name: "Irritability", value: false },
          { name: "Pulling on Ears", value: false }
        ],
        name: "Abnormal Behavior"
      },
      {
        //feverAllergyList:
        list:
        [
          { name: "Fever", value: false },
          { name: "Nasal Congestion", value: false },
          { name: "Runny nose", value: false },
          { name: "Sneezing", value: false },
          { name: "Vomiting", value: false }
        ],
        name: "Fever and Allergies"
      },
      {
        //foodWasteList:
        list:
        [
          { name: "Decreased Appetite", value: false },
          { name: "Diarrhea", value: false },
          { name: "Not Peed for >6 Hours", value: false },
          { name: "Not Pooping", value: false }
        ],
        name: "Food and Waste"
      },
      {
        //respiratoryList:
        list:
        [
          { name: "Coughing", value: false }
        ],
        name: "Respiratory"
      },
      {
        //skinList:
        list:
        [
          { name: "Dry Flaky Scalp", value: false },
          { name: "Excess Tearing", value: false },
          { name: "Rash (body)", value: false },
          { name: "Rash (diaper area)", value: false },
          { name: "Small/tiny red or white bumps on nose, cheeks, or forehead", value: false },
          { name: "Yellow/orange looking skin", value: false }
        ],
        name: "Skin"
      },
      {
        //OralList:
        list:
        [
          { name: "White patches on lips, tongue, inside cheeks", value: false }
        ],
        name: "Oral"
      }
    ]

    this.symptoms = [];
    this.selected = [];
    this.response = [];
  }

  ngOnInit() {
    //this.getSymptoms();
  }

  async postForm() {

    var filteredLists = [
      [this.symptomsList[0].list.filter(val => val.value)],
      [this.symptomsList[1].list.filter(val => val.value)],
      [this.symptomsList[2].list.filter(val => val.value)],
      [this.symptomsList[3].list.filter(val => val.value)],
      [this.symptomsList[4].list.filter(val => val.value)],
      [this.symptomsList[5].list.filter(val => val.value)]
    ]

    console.log(filteredLists);

    for (let sublist of filteredLists) {
      console.log(sublist);
      for (let symptoms of sublist) {
        for(let symptom of symptoms) {
          this.selected.push(symptom.name);
        }
      }
    }

    console.log(this.selected);

    Promise.all(this.response = await this.formService.postForm(this.selected))
      .then(value => this.pushPage())
    filteredLists = [];
  }

  pushPage() {
    this.navCtrl.push(CausesPage, {
      response: this.response
    });
    this.selected = []
  }

  async getSymptoms() {
    /*this.symptomsList = await this.formService.getSymptoms();*/
  }


}