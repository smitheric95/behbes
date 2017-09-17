import { Component } from '@angular/core';
import { ModalController, AlertController, Platform } from 'ionic-angular';
import { AddPage } from '../add/add'
import { LocalNotifications } from '@ionic-native/local-notifications';


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

constructor(public modalCtrl: ModalController, public alertCtrl: AlertController, 
  private plt: Platform, private localNotifications: LocalNotifications) {
    //constructor(public modalCtrl: ModalController, public alertCtrl: AlertController, 
    //private plt: Platform) {
    this.medicines = ['Alex\'s cough medicine', 'Jenny\'s advil medicine'];
    this.times = ['3:55 PM','5:15 AM'];
    this.a = new Audio();
    this.a.src = 'http://jplayer.org/audio/m4a/Miaow-07-Bubble.m4a';
    this.a.load();
    // this.checkAlarm();
    this.plt.ready().then((rdy) => {
        this.localNotifications.on('click', (notification, state) => {
            let json = JSON.parse(notification.data);

            let alert = this.alertCtrl.create({
                title: notification.title,
                subTitle: json.mydata
            });
            alert.present();
        });
    });
    
  }

  scheduleNotification(alarmText: string, time: number){
      this.localNotifications.schedule({
          id: 1,
          title: 'Hussh',
          text: alarmText,
          at: new Date(new Date().getTime() + time * 1000),
          data: { myData: alarmText}
      });
  }

  openModal(){
      let myModal = this.modalCtrl.create(AddPage);

      myModal.present();
      myModal.onDidDismiss(data=>{
          this.medicines.push(data.title);
          this.times.push(data.hour + ":" + data.minute + " " + data.type); 
          console.log(this.getTimeDifference(data.hour,data.minute,data.type));
          this.scheduleNotification(data.title,this.getTimeDifference(data.hour,data.minute,data.type));

      })

  }
  
  getTimeDifference(hour:string, minute:string, type:string){
      this.x = new Date();
      
      var newHour; //alarm hour according to 24 hour clock
      var hourDifference; 
      var minuteDifference;
      var secondsDifference; 


      if (type == "PM") //hour 12 to hour 23
      {
          if (hour == "12") //hour 12
              newHour = 12;
          else //hour 13 to hour 23
              newHour = +hour + 12;
      } 
      else if (type == "AM") //hour 0 to hour 11
      {
         if (hour == "12")
              newHour = 0;
         else 
           newHour = +hour; 
      }

      //calculate difference in hours
      if (+this.x.getHours() > newHour) //alarm takes place next day (current time > alarm time)
          hourDifference = 24 - +this.x.getHours() + newHour;
      else if (+this.x.getHours() == newHour && +this.x.getMinutes() < +minute) //alarm takes place within the hour
          hourDifference = 0;
      else if (+this.x.getHours() == newHour && +this.x.getMinutes() >= +minute) //same hour, next day
          hourDifference = 24;
      else if (+this.x.getHours() < newHour) //alarm takes place on the day
          hourDifference = newHour - +this.x.getHours();
      
      secondsDifference = hourDifference * 3600; 

      if (+this.x.getMinutes() > +minute) //current minute is later than alarm minute
      {
          //first subtract one hour, add minutes - 1 (in seconds), add remaining seconds
          secondsDifference -= 3600;
          minuteDifference = 60 - +this.x.getMinutes() + +minute - 1;
          secondsDifference += (60 * minuteDifference); 
          secondsDifference += (60 - this.x.getSeconds());
      }
      else if (+this.x.getMinutes() < +minute ) //current minute is earlier than alarm minute
      {
          minuteDifference = +minute - +this.x.getMinutes() - 1;
          secondsDifference += (60 * minuteDifference);
          secondsDifference += (60 - this.x.getSeconds());
      }
      else if (+this.x.getMinutes() == +minute) //same minute 
      {
          // first subtract one hour, add 59 minutes, add remaining seconds         
          secondsDifference -= 3600;
          secondsDifference += (59 * 60);
          secondsDifference += (60 - +this.x.getSeconds());
      }

      return secondsDifference;  

  }

  checkAlarm(){
     // while(1){
          var time;
          var strMinute;
          //this.x = new Date();
          this.x = new Date("2011-04-20T15:55:51.01");
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

          if (this.times.indexOf(time) > -1)
          {
            this.a.play();
          }

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
