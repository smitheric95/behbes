import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormService } from '../../app/services/form/form.service';

import { CausesPage } from '../causes/causes';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
  styleUrls: ['/pages/history/history.scss'],
})
export class HistoryPage {
  
  evals: any[];

  formatted: any[];

  response: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private formService: FormService) {
    /* name and count */
    this.evals = [
        {symptoms: ["Fever", "Sneezing", "Coughing"], date: '2016-09-16 23:59:59'},
        {symptoms: ["Coughing", "Sneezing"], date: '2016-09-15 12:06:30'}
    ]

    this.formatted = [];
  }

ngOnInit() {
    //this.getHistory().then(this.formatDateTime).then(value => this.formatDateTime());
    this.formatDateTime();
}


  //sends the other possible causes to return to this page
  async evalTapped(event, symptoms) {
    console.log(symptoms);
    Promise.all(this.response = await this.formService.postForm(symptoms))
    .then(value => this.pushPage())
  }

  pushPage() {
    this.navCtrl.push(CausesPage,{response: this.response});
  }

  async getHistory() {
    Promise.all(this.evals = await this.formService.getHistory())
  }

  formatDateTime() {
    var date;

      for (let e of this.evals) {
        date = new Date(e.date);
        //console.log(date);
        console.log(date.getDate());
        console.log(date.getMonth());
        this.formatted.push({hour: date.getHours(), minute: date.getMinutes(), day: date.getDate(), month: date.getMonth(), symptoms: e.symptoms})
      }
  }
}
