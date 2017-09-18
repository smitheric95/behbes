import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { FormService } from '../../app/services/form/form.service';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-illness',
  templateUrl: 'illness.html'
})
export class IllnessPage {

  Name: string;
  about: string;
  naturals: any[];
  conventionals: any[];
  resources: any[];


  constructor(public navCtrl: NavController, public navParams: NavParams,
     private formService: FormService, private san: DomSanitizer) {
    this.Name = "";
    this.about = "";
    this.naturals = [{description: "",Hyperlink: "#"}];
    this.conventionals = [{description: "",Hyperlink: "#"}];
    this.resources = [{description: "",Hyperlink: "#"}];
  
  }

  ngOnInit() {
    this.Name = this.navParams.get('Name');
    this.getAbout();
    this.getConventional();
    this.getNatural();
    this.getResources();
  }

  homeTapped(event) {
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  async getAbout() {
    var temp = ""
    Promise.all(temp = await this.formService.getIllness({Illness: this.Name}))
    .then(function() {
      temp.replace("\u0097", '-');
      temp.replace("\u0092", '\'');
    });
    this.about = temp;
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

  sanitize(url){
      return this.san.bypassSecurityTrustResourceUrl(url);


  }
}
