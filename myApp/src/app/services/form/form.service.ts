import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FormService {

    constructor(private http: Http) {}

    getForm(): Promise<String>{
		return this.http.get(`http://localhost:8088/getData`)
        .toPromise().then(response => response.json().data);
    }

}