

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
}