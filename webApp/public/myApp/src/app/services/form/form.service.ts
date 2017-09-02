import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FormService {

    constructor(private http: Http) {}

    getForm(){
		return this.http.get(`/getData`)
        .toPromise().then(function(res) {
            return JSON.stringify(res.json());
        });
    }


    postForm(selected: any[]){
        return this.http.post(`http://private-7be936-behbes.apiary-mock.com/postForm`,selected)
        .toPromise().then(function(res) {
            return JSON.stringify(res.json());
        });
    }


}