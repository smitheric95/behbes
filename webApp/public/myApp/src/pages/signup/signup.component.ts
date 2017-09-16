import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '../../app/services/globals/globals';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
	selector: 'signup',
	templateUrl: 'signup.component.html',
	styleUrls: ['signup.component.css']
})

export class SignupComponent implements OnInit {
	
	username: AbstractControl;
	password: AbstractControl;
	fname: AbstractControl;
	lname: AbstractControl;
	email: AbstractControl;
	signUpForm: FormGroup;

	constructor(public http:Http, public globals:Globals, public nav:NavController, public alertControl:AlertController){
		this.signUpForm = new FormGroup({
			username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
			password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$')]),
			fname: new FormControl('', [Validators.required]),
			lname: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email])

		});
		
	}
	signUp(form){
		this.http.post('http://localhost:8100/signup', JSON.stringify({"Username":form._value.username, "Password":form._value.password, "FirstName":form._value.fname, "LastName":form._value.lname, "Email":form._value.email}))
			.subscribe(
				data=> this.login(form),
				err=> {
					this.showAlert();
					this.signUpForm.reset();
				}
			);
	}
	login(form){
		this.http.post("http://localhost:8100/signin", JSON.stringify({"Username": form._value.username, "Password":form._value.password}))
			.subscribe( data => {
				this.globals.setAuthToken(data.json()['Token']);
				this.nav.setRoot(HomePage);
			},
			err=> console.log(err));
	}
	showAlert(){
		let alert = this.alertControl.create({
			title:'Registration Failed',
			subTitle: 'Username is taken. Please use a different one',
			buttons: ['OK']
		});
		alert.present();
	}
	ngOnInit() { }
}