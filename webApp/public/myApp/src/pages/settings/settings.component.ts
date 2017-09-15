import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../app/services/globals/globals';
import { AlertController, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
	selector: 'settings',
	templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit {
	username:string;
	oldPass:string;
	newPass:string;
	firstName:string;
	lastName: string;
	email:string;
	constructor(public http:Http, public globals:Globals, public alertControl:AlertController, public nav: NavController){
		this.http.get('http://localhost:8100/userInfo', {headers: this.globals.getHeaders()})
			.subscribe( data => {
				this.username = data.json()['Username'];
				this.firstName = data.json()['FirstName'];
				this.lastName = data.json()['LastName'];
				this.email = data.json()['Email'];
			});
	}
	editInfo(){
		this.http.put('http://localhost:8100/userInfo',JSON.stringify({"OldPass": this.oldPass, "NewPass":this.newPass, "Email":this.email}) ,{headers: this.globals.getHeaders()})
			.subscribe( data => {
				this.showAlert(true);
				this.nav.setRoot(HomePage);
			},
			err => {
				this.showAlert(false);
				this.oldPass="";
				this.newPass="";
			});
	}
	showAlert(success:boolean){
		if(success){
			let alert = this.alertControl.create({
				title:'Success',
				subTitle: 'Your information has been updated',
				buttons: ['OK']
			});
			alert.present();
		}
		else{
			let alert = this.alertControl.create({
				title:'Unable to edit info',
				subTitle: 'Please try again',
				buttons: ['OK']
			});
			alert.present();
		}
	}
	ngOnInit() { }
}