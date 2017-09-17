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

  loginMes: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formService: FormService) {
    /* name and count */
    this.evals = []

    this.formatted = [];

    this.loginMes = ""
  }

ngOnInit() {
    this.getHistory().then(value => this.formatDateTime());
    if(this.formatted == []) {
      this.loginMes = "You need to be logged in to view this page!";
    }
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
        date = new Date(e.Date);
        this.formatted.push({hour: this.pHours(date.getHours()-5), minute: this.padding(date.getMinutes()),
           day: date.getDate(), month: date.getMonth(), amPM: this.getAMPM(date.getHours()-5),
            symptoms: e.Symptoms})
      }

    this.formatted = this.formatted.reverse()
  }

  padding(value) {
    if(value < 10) {
        return '0' + value;
    } else {
        return value;
    }
  }

    pHours(value) {
      switch (value) {
        case 0: {
          value = 24
          break;
        }
        case -1: {
          value = 23
          break;
        }
        case -2: {
          value = 22
          break;
        }
        case -3: {
          value = 21
          break;
        }
        case -4: {
          value = 20
          break;
        }
        case -5: {
          value = 19
          break;
        }
        default: {
          value = value
        }
      }
      if(value > 12) {
        value = value - 12;
      }
      if(value < 10) {
          return '0' + value;
      } else {
          return value;
      }
    }

  getAMPM(value) {
    switch (value) {
      case 0: {
        value = 24
        break;
      }
      case -1: {
        value = 23
        break;
      }
      case -2: {
        value = 22
        break;
      }
      case -3: {
        value = 21
        break;
      }
      case -4: {
        value = 20
        break;
      }
      case -5: {
        value = 19
        break;
      }
      default: {
        value = value
      }
    }
    if(value > 12) {
        return "PM";
    } else {
        return "AM";
    }
  }

}
