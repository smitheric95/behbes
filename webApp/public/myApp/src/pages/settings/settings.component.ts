import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../app/services/globals/globals';
import { AlertController, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
	selector: 'settings',
	templateUrl: 'settings.component.html',
	styleUrls: [ '/src/pages/settings/settings.component.css' ]
})

export class SettingsComponent implements OnInit {
	username:string;
	// oldPass:string;
	// newPass:string;
	firstName:string;
	lastName: string;
	emailString: string;
	email: AbstractControl;
	oldPass: AbstractControl;
	newPass: AbstractControl;
	settingsForm: FormGroup;

	constructor(public http:Http, public globals:Globals, public alertControl:AlertController, public nav: NavController){
		this.http.get('http://hussh.site/userInfo', {headers: this.globals.getHeaders()})
			.subscribe( data => {
				this.username = data.json()['Username'];
				this.firstName = data.json()['FirstName'];
				this.lastName = data.json()['LastName'];
				this.emailString = data.json()['Email'];
			});
		this.settingsForm = new FormGroup({
			oldPass: new FormControl('', [Validators.required]),
			newPass: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$')]),
			email: new FormControl(this.emailString, [Validators.required, Validators.email])

		});
	}
	editInfo(form){
		this.http.put('http://hussh.site/userInfo',JSON.stringify({"OldPass": form._value.oldPass, "NewPass":form._value.newPass, "Email":form._value.email}) ,{headers: this.globals.getHeaders()})
			.subscribe( data => {
				this.showAlert(true);
				this.nav.setRoot(HomePage);
			},
			err => {
				this.showAlert(false);
				this.settingsForm.reset();
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
