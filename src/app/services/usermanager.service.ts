import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { Subscription, Observable } from 'rxjs';
import { UserVO } from '../user';

@Injectable() 
export class UserManagerService{

    constructor(public http:Http)
    {

    }
baseUrl: string = 'http://localhost:8081/';
getUsers(): Promise<any>{
  return this.http.get(this.baseUrl+"getUsers")
   .toPromise()
   .then(res=>res.json());
   
}



delete(id): Promise<any>{
  return this.http.delete(this.baseUrl+"deleteUser?id="+id)
   .toPromise()
   .then(res=>res.json());
}

 addUserInfo(
    user : UserVO): Promise<any>{

      let body = JSON.stringify( user );            
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers : headers});

    return this.http.post( this.baseUrl+"addUser", body, options )
    .toPromise()
    .then(res=>res.json()) ;  
  }

  updateUserInfo(
    userVo : UserVO): Promise<any>{

      let body = JSON.stringify( userVo );            
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers : headers});

    return this.http.post( this.baseUrl+"updateUser", body, options )
    .toPromise()
    .then(res=>res.json()) ;  
  }
}