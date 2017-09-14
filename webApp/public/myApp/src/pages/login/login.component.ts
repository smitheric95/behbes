import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '../../app/services/globals/globals';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
@Component({
	selector: 'login',
	templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
	username:string;
	password: string;
	forgottenPass:boolean;
	constructor(public http:Http, public globals:Globals, public nav:NavController, public alertControl: AlertController){
		this.username="";
		this.password="";
		this.forgottenPass=false;
	}

	login(){
		this.http.post("http://localhost:8100/signin", JSON.stringify({"Username": this.username, "Password":this.password}))
			.subscribe( data => {
				this.globals.setAuthToken(data.json()['Token']);
				this.nav.setRoot(HomePage);
			},
			err=> {
				this.showAlert();
				this.username="";
				this.password="";
			});
	}
	ngOnInit() { }
	showAlert(){
		let alert = this.alertControl.create({
			title:'Login Failed',
			subTitle: 'Wrong username or password',
			buttons: ['OK']
		});
		alert.present();
	}
	forgotPassword(){
		this.http.put("http://localhost:8100/forgotPass", JSON.stringify({"Username":this.username}))
			.subscribe( data => {
				this.showPassReset(true);
				this.username="";
				this.password="";
			},
			err=>{
				this.showPassReset(false);
				this.username="";
				this.password="";
			})
	}
	showPassReset(success:boolean){
		if(success){
			let alert = this.alertControl.create({
				title:'Success',
				subTitle:'Your password has been reset. Please check your e-mail for your new password',
				buttons: ['OK']
			});
			alert.present();
		}
		else{
			let alert = this.alertControl.create({
				title:'Failure',
				subTitle:'Your username information was not found in our database',
				buttons: ['OK']
			});
			alert.present();
		}
		
	}
}
