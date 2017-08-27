import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FormService {

    constructor(private http: Http) {}

    getForm(): Promise<any>{
		return this.http.get(`http://private-7be936-behbes.apiary-mock.com/getData`)
        .toPromise().then(function(res) {
            console.log(res);
            return res => res.json() as String[];
        });
    }


}