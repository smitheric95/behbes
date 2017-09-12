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
  x;
  hour:string;
  minute:string;

  constructor() {
    //this.causes = navParams.get('response');
    //this.cause = [];
    this.medicines = ['Alex\'s cough medicine', 'Jenny\'s advil medicine'];
    this.times = ['3:54 PM','5:15 AM'];
    this.a = new Audio();
    this.a.src = 'http://jplayer.org/audio/m4a/Miaow-07-Bubble.m4a';
    this.a.load();
    this.checkAlarm();
    
  }

  checkAlarm(){
     // while(1){
       var time;
       var strMinute;
        //this.x = new Date();
        this.x = new Date("2011-04-20T23:59:51.01");
        this.hour = this.x.getHours();
        this.minute = this.x.getMinutes();
        
        if (+this.minute < 10)
        {
          strMinute = "0" + this.minute;
        } else 
        {
          strMinute = this.minute;
        }

        if (+this.hour > 12) //Between 1:00 and 11:59 PM
        {
          let revisedHour = +this.hour % 12;
          time = revisedHour + ":" + strMinute + " PM";
        } 
        else if (+this.hour == 0) //Between 12:00 to 12:59 AM
        {
          time = "12:" + strMinute + " AM";
        }
        else if (+this.hour == 12) //Between 12:00 to 12:59 PM
        {
          time = "12:" + strMinute + " PM";
        }
        else //Between 1:00 and 11:59 AM
        {
          time = this.hour + ":" + strMinute + " AM";
        }

        console.log(time);

      //}
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
