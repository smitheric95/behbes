import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AgmCoreModule } from '@agm/core';

@Component({
    selector: 'page-list',
    templateUrl: 'map.html',
    styles: [`
        agm-map {
          height: 300px;
      }
    `],
    template: `
    <agm-map [latitude]="lat" [longitude]="lng"></agm-map>
    `
})


export class MapPage {

    constructor(public navCtrl: NavController) {


    }

    ngOnInit() {
    }

}
