import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


type topicsArray = Array<{id:number, title:string}>;

 var topicsArray= [{id: 1, title: 'Baby Massage'},
                   {id: 2, title: 'Bathing'},
                   {id: 3, title: 'Bottle Feeding'},
                   {id: 4, title: 'Breastfeeding'},
                   {id: 5, title: 'Conforting'},
                   {id: 6, title: 'Ciaper Change'},
                   {id: 7, title: 'How to Swadle a Baby'},
                   {id: 8, title: 'How to Take your Baby\'s Temperature'},
                   {id: 9, title: 'New Burping Techniques'},
                   {id: 10, title: 'Sleep'}];

@Component({
  selector: 'page-infanthealth',
  templateUrl: 'infanthealth.html',
  styleUrls: ['/pages/infanthealth/infanthealth.css'],
})


export class InfantHealthPage {


  constructor(public navCtrl: NavController) {

  }

  public currentTopic;

  public setTopic = (topic) => {  
    if (this.currentTopic === topic) return;
    this.currentTopic = topic;
}

}
