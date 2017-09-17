import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';

import { FormService } from '../../app/services/form/form.service';

import { CausesPage } from '../causes/causes';
import { SampleModalPage } from './../sample-modal/sample-modal';

this.symptomsList = [{category: "Respiratory", symptom: "Coughing"},
                        {category: "Abnormal Behavior", symptom: "Exsessive Crying"},
                        {category: "Food and Waste", symptom: "Decreased Appetite"},
                        {category: "Food and Waste", symptom: "Diarrhea"},
                        {category: "Skin", symptom: "Dry Flaky Scalp"},
                        {category: "Skin", symptom: "Excess Tearing"},
                        {category: "Fever and Allergies", symptom: "Fever"},
                        {category: "Abnormal Behavior", symptom: "Irritibility"},
                        {category: "Food and Waste", symptom: "Not Peed for > 6 Hours"},
                        {category: "Food and Waste", symptom: "Not Pooping"},
                        {category: "Fever and Allergies", symptom: "Nasal Congestion"},
                        {category: "Abnormal Behavior", symptom: "Pulling on Ears"},
                        {category: "Skin", symptom: "Rash (body)"},
                        {category: "Skin", symptom: "Rash (diaper area)"},
                        {category: "Fever and Allergies", symptom: "Runny nose"},
                        {category: "Fever and Allergies", symptom: "Sneezing"},
                        {category: "Skin", symptom: "Small/tiny red or white bumps on nose, cheeks, or forehead"},
                        {category: "Abnormal Behavior", symptom: "Twitching"},
                        {category: "Fever and Allergies", tsymptom: "Vomiting"},
                        {category: "Oral", symptom: "White patches on lips, tongue, inside cheeks"},
                        {category: "Skin", symptom: "Yellow/orange looking skin"}]

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})


export class FormPage {
  categoryList: any[];
  symptomsList: any;
  symptoms: any[];
  selected: any[];
  response: any[];
  categories: any;

  constructor(public navCtrl: NavController, private formService: FormService, public modalCtrl: ModalController) {
    // this.symptomsList = [
    //   "Coughing",
    //   "Exsessive Crying",
    //   "Decreased Appetite",
    //   "Diarrhea",
    //   "Dry Flaky Scalp",
    //   "Excess Tearing",
    //   "Fever",
    //   "Irritibility",
    //   "Not Peed for > 6 Hours",
    //   "Not Pooping",
    //   "Nasal Congestion",
    //   "Pulling on Ears",
    //   "Rash (body)",
    //   "Rash (diaper area)",
    //   "Runny nose",
    //   "Sneezing",
    //   "Small/tiny red or white bumps on nose, cheeks, or forehead",
    //   "Twitching",
    //   "Vomiting",
    //   "White patches on lips, tongue, inside cheeks",
    //   "Yellow/orange looking skin"
    // ]
    this.categoryList = [ "Abnormal Behavior",
                          "Fever and Allergies",
                          "Food and Waste",
                          "Respiratory",
                          "Skin",                      
                          "Oral"]

    

    this.symptoms = [];
    this.selected = [];
    this.response = [];
    this.categories = [];   

    // console.log(this. symptomsList[0].category)
    //console.log(this. symptomsList[0].symptom)
    
  }
  
  ngOnInit() {
    this.getSymptoms();
  }

  async postForm() {
    var filteredS
    filteredS = this.symptoms.filter(val => val.value, );
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
    //symptomsList = this.symptomsList; 
    this.symptomsList = await this.formService.getSymptoms();
    this.createSymptomsObj();
    console.log(this.symptomsList)
    // this.category = await this.formService.getSymptoms();
    // this.createCategoryObj();
    //console.log("symptoms ", this.symptomsList[0][0]);

  }

  createSymptomsObj() {
    var cat = this.symptomsList[0].category;
    console.log(cat)
    for (let symptom of this.symptomsList) {
        this.symptoms.push({ name: symptom, value: false});   
    }
  }

}

