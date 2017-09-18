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
  vidoes: any[] = [
    'https://www.youtube.com/embed/LlobmLI0WLw',
    'https://www.youtube.com/embed/lQWWxWMLt-M',
    'https://www.youtube.com/embed/WxE5vnXoyrg',
    'https://www.youtube.com/embed/bQ_St20NHDI',
    'https://www.youtube.com/embed/j2C8MkY7Co8',
    'https://www.youtube.com/embed/m50PTFmmlxw',
    'https://www.youtube.com/embed/6sHcL1DiDfc',
    'https://www.youtube.com/embed/hzSrvuXRA68',
    'https://www.youtube.com/embed/FIIG6n55Ito',
    'https://www.youtube.com/embed/Y1VYWmCjYqc',
    'https://www.youtube.com/embed/IS7AVfyoF_Y',
    'https://www.youtube.com/embed/gNrJC5CIpgk',
    'https://www.youtube.com/embed/WlzjkHdd1IU',
    'https://www.youtube.com/embed/8kTKnZOmJXU',
    'https://www.youtube.com/embed/g_k50wOf564',
    'https://www.youtube.com/embed/FZA_64nCobA'
  ]

  constructor(public navCtrl: NavController) {

  }

  public currentTopic;

  public setTopic = (topic) => {  
    if (this.currentTopic === topic) return;
    this.currentTopic = topic;
}

}
