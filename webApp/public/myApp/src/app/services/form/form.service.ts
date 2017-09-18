import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Globals } from '../globals/globals';

@Injectable()
export class FormService {

    constructor(private http: Http, private globals:Globals) {}

/*     getForm(){
		return this.http.get(`/getData`)
        .toPromise().then(function(res) {
            return JSON.stringify(res.json());
        });
    } */

    getIllness(name: any){
        return this.http.post(`https://hussh.site/remedies`,name)
        .toPromise().then(function(res) {
            return res.json().About;
        });
    }

    getConventional(name: any){
		return this.http.post(`https://hussh.site/conventionalremedies`,name)
        .toPromise().then(function(res) {
            return res.json();
        });
    }

    getNatural(name: any){
		return this.http.post(`https://hussh.site/naturalremedies`,name)
        .toPromise().then(function(res) {
            return res.json();
        });
    }

    getResources(name: any){
		return this.http.post(`https://hussh.site/resources`,name)
        .toPromise().then(function(res) {
            return res.json();
        });
    }

    getHistory(){
		return this.http.get(`https://hussh.site/history`,{headers:this.globals.getHeaders()})
        .toPromise().then(function(res) {
            return res.json();
        });
    }

    postForm(selected: any[]){
        return this.http.post(`https://hussh.site/postform`,selected,{headers:this.globals.getHeaders()})
        .toPromise().then(function(res) {
            return res.json();
        });
    }

/*     getSymptoms() {
        return this.http.get(`http://private-7be936-behbes.apiary-mock.com/getSymptoms`)
        .toPromise().then(function(res) {
            return res.json();
        });
    }
 */

}