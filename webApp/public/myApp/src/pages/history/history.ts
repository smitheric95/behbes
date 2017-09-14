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
        {symptoms: ["Fever, Sneezing, Coughing"], date: '9999-12-31 23:59:59'},
        {symptoms: ["Coughing, Sneezing"], date: '2012-06-14 12:06:30'}
    ]

    this.formatted = [];
  }

ngOnInit() {
    //this.getHistory().then(this.formatDateTime);
    this.formatDateTime();
}


  //sends the other possible causes to return to this page
  async evalTapped(event, symptoms) {
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
        date = new Date(e.date*1000);
        this.formatted.push({hour: date.getHours(), minutes: date.getMinutes(), day: date.getDay(), months: date.getMonth()})
      }
  }
}