import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FormService } from '../../app/services/form/form.service';

@Component({
  selector: 'page-illness',
  templateUrl: 'illness.html'
})
export class IllnessPage {

  Name: string;
  about: {About: string};
  naturals: any[];
  conventionals: any[];
  resources: any[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private formService: FormService) {
    this.Name = navParams.get('Name');
    this.about = {About: "Boop"};
    this.naturals = [{description: "NaturalBoop",Hyperlink: "#"}];
    this.conventionals = [{description: "ConventionalBoop",Hyperlink: "#"}];
    this.resources = [{description: "ResourcesBoop",Hyperlink: "#"}];
  
  }

  ngOnInit() {
    this.getAbout();
    this.getConventional();
    this.getNatural();
    this.getResources();
  }

  homeTapped(event) {
    this.navCtrl.popToRoot();
  }

  async getAbout() {
    Promise.all(this.about = await this.formService.getIllness(this.Name));
  }
  async getConventional() {
    Promise.all(this.conventionals = await this.formService.getConventional(this.Name));
  }
  async getNatural() {
    Promise.all(this.naturals = await this.formService.getNatural(this.Name));

  }
  async getResources() {
    Promise.all(this.resources = await this.formService.getResources(this.Name));
  }


}
