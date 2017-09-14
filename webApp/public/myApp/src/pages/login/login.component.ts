import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '../../app/services/globals/globals';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['/pages/login/login.component.css']
})

export class LoginComponent implements OnInit {
	username:string;
	password: string;

	constructor(public http:Http, public globals:Globals, public nav:NavController){
		this.username="";
		this.password="";
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