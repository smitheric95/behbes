import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FormService {

    constructor(private http: Http) {}

    getForm(){
		return this.http.get(`/getData`)
        .toPromise().then(function(res) {
            console.log(res);
            return JSON.stringify(res.json());
        });
    }

    


}