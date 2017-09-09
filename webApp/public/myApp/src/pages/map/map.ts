import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
    styles: [`
        agm-map {
          height: 300px;
          width: 300px;
      }
    `],
})


export class MapPage {

    
    latitude: any;
    longitude: any;
    constructor(public navCtrl: NavController) {
        this.latitude;
        this.longitude;
    }

    

    ngOnInit(){
        if(navigator.geolocation){
           navigator.geolocation.getCurrentPosition(position => {
             this.latitude = position.coords.latitude;
             this.longitude = position.coords.longitude;
             console.log(position.coords); 
           });
        }
      }

}
