import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormService } from '../../app/services/form/form.service';

@Component({
  selector: 'page-home',
  templateUrl: 'form.html',
})
export class FormPage {

  
  symptoms: [
    "Coughing",
    "Crying",
    "Diarrhea",
    "Difficulty Sleeping",
    "Excess Tearing",
    "Fever",
    "Irritablity",
    "Nasal Congestion",
    "Rash (body)",
    "Rash (diaper area)",
    "Runny Nose",
    "Sneezing",
    "Small/Tiny white bumps (nose, cheek, forehead)",
    "Vomiting",
    "White patches (lips, tongue, inside cheeks)",
    "Yellow/Orange skin"
  ];

  constructor(public navCtrl: NavController, private formService: FormService) {

  }

  async postForm(selected: String) {

    this.formService.postForm(selected);
    
  }

}
