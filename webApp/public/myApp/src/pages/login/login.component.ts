import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '../../app/services/globals/globals';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';


@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['/src/pages/login/login.compoenent.css']
})

export class LoginComponent implements OnInit {
	forgottenPass:boolean;
	username: AbstractControl;
	password: AbstractControl;
	loginForm: FormGroup;

	email: AbstractControl;
	forgotPasswordForm: FormGroup;

	constructor(public http:Http, public globals:Globals, public nav:NavController, public alertControl: AlertController){
		this.forgottenPass=false;

		this.loginForm = new FormGroup({
			// name: new FormControl('', [Validators.required, Validators.minLength(4)]),
			username: new FormControl('', [Validators.required]),
			// email: new FormControl('', [Validators.required,Validators.email])
			password: new FormControl('', [Validators.required])
		});

		this.forgotPasswordForm = new FormGroup({
			email: new FormControl('', [Validators.required])
		});
	}

	login(form){
		this.http.post("/signin", JSON.stringify({"Username": form._value.username, "Password": form._value.password}))
			.subscribe( data => {
				this.globals.setAuthToken(data.json()['Token']);
				this.nav.setRoot(HomePage);
			},
			err=> {
				this.showAlert();
				this.loginForm.reset();
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
	forgotPass(form){
		this.http.put("/forgotPass", JSON.stringify({"Email":form._value.email}))
			.subscribe( data => {
				this.showPassReset(true);
				this.forgotPasswordForm.reset();
			},
			err=>{
				this.showPassReset(false);
				this.forgotPasswordForm.reset();
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
				subTitle:'Account information for given email was not found in our database',
				buttons: ['OK']
			});
			alert.present();
		}

	}
}
