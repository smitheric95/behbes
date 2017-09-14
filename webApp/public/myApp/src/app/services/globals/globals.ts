import { Http, Headers } from '@angular/http';


export class Globals{
    authToken: string;
    constructor(){
        this.authToken="";
    }
    isLogged(){
        return this.authToken!="" ? true : false;
    }
    setAuthToken(token:string){
        this.authToken=token;
    }
    getAuthToken(){
        return this.authToken;
    }
    getHeaders():Headers{
        let headers=new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.getAuthToken());
        return headers;
    }
}