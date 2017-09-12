import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '../../app/services/globals/globals';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
	selector: 'signup',
	templateUrl: 'signup.component.html'
})

export class SignupComponent implements OnInit {
	username:string;
	password: string;
	firstName:string;
	lastName: string;
	email:string;
	constructor(public http:Http, public globals:Globals, public nav:NavController){
		this.username="";
		this.password="";
		this.firstName="";
		this.lastName="";
		this.email="";
		
	}
	signUp(){
		this.http.post('http://localhost:8100/signup', JSON.stringify({"Username":this.username, "Password":this.password, "FirstName":this.firstName, "LastName":this.lastName, "Email":this.email}))
			.subscribe(
				data=> this.login(),
				err=> console.log(err)
			);
	}
	login(){
		this.http.post("http://localhost:8100/signin", JSON.stringify({"Username": this.username, "Password":this.password}))
			.subscribe( data => {
				this.globals.setAuthToken(data.json()['Token']);
				this.nav.setRoot(HomePage);
			},
			err=> console.log(err));
	}
	ngOnInit() { }
}