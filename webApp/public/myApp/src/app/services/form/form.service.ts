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

    getIllness(name: string){
        return this.http.post(`/remedies`,name)
        .toPromise().then(function(res) {
            return res.json()[0];
        });
    }

    getConventional(name: string){
		return this.http.post(`/conventionalremedies`,name)
        .toPromise().then(function(res) {
            return res.json();
        });
    }

    getNatural(name: string){
		return this.http.post(`/naturalremedies`,name)
        .toPromise().then(function(res) {
            return res.json();
        });
    }

    getResources(name: string){
		return this.http.post(`/resources`,name)
        .toPromise().then(function(res) {
            return res.json();
        });
    }

    getHistory(){
		return this.http.get(`/history`,{headers:this.globals.getHeaders()})
        .toPromise().then(function(res) {
            return res.json();
        });
    }

    postForm(selected: any[]){
        return this.http.post(`/postform`,selected,{headers:this.globals.getHeaders()})
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