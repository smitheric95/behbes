import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  form: any;
  hours:any[];
  minutes:any[];

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
      this.form = {title:"My Alarm",hour:"12",minute:"00",type:"PM"};
      this.hours = ['1','2','3','4','5','6','7','8','9','10','11','12'];
      this.minutes=["00","01","02","03","04","05","06","07","08","09",
                    "10","11","12","13","14","15","16","17","18","19",
                    "20","21","22","23","24","25","26","27","28","29",
                    "30","31","32","33","34","35","36","37","38","39",
                    "40","41","42","43","44","45","46","47","48","49",
                    "50","51","52","53","54","55","56","57","58","59",];
  }

  submitModal(){
      this.viewCtrl.dismiss(this.form);
  }

  closeModal(){
      this.viewCtrl.dismiss();
  }



  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddPage');
  }


}
