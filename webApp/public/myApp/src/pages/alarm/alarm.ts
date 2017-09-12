import { Component } from '@angular/core';
//import { NavController, NavParams } from 'ionic-angular';

//import { FormService } from '../../app/services/form/form.service';

//import { IllnessPage } from '../illness/illness';

@Component({
  selector: 'page-alarms',
  templateUrl: 'alarm.html'
})
export class AlarmsPage {
  
  medicines: any[];
  times: any[];
  a;

  constructor() {
    //this.causes = navParams.get('response');
    //this.cause = [];
    this.medicines = ['Alex\'s cough medicine', 'Jenny\'s advil medicine'];
    this.times = ['3:54','5:15'];
    this.a = new Audio();
    this.a.src = 'http://jplayer.org/audio/m4a/Miaow-07-Bubble.m4a';
    this.a.load();
    
  }


  playSound(){
    if (this.a.currentTime == 0)
      this.a.play();
    else {
      this.a.pause();
      this.a.currentTime = 0;
    }
  }
  //sends the other possible causes to return to this page
  /*async causeTapped(event, cause_name) {

    Promise.all(this.cause = await this.formService.getIllness(cause_name))
      .then(value => this.pushPage(cause_name));
  }

  pushPage(cause_name) {
    this.navCtrl.push(IllnessPage, {
      cause: this.cause,
      cause_name: cause_name
    });
  }*/
}
