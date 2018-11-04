import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { TaskVO } from '../task';
import { Subscription, Observable } from 'rxjs';

@Injectable() 
export class TaskManagerService{

    constructor(public http:Http)
    {

    }
baseUrl: string = 'http://localhost:8080/';
getTasks(): Promise<any>{
  return this.http.get(this.baseUrl+"getTasks")
   .toPromise()
   .then(res=>res.json());
   
}

getTasksById(id): Observable<any>{
  return this.http.get(this.baseUrl+"getTask?id="+id);
   
}



delete(id): Promise<any>{
  return this.http.delete(this.baseUrl+"delete?id="+id)
   .toPromise()
   .then(res=>res.json());
}

 addTaskInfo(
    task : TaskVO): Promise<any>{

      let body = JSON.stringify( task );            
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers : headers});

    return this.http.post( this.baseUrl+"addTask", body, options )
    .toPromise()
    .then(res=>res.json()) ;  
  }

  updateTaskInfo(
    task : TaskVO): Promise<any>{

      let body = JSON.stringify( task );            
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers : headers});

    return this.http.post( this.baseUrl+"updateTask", body, options )
    .toPromise()
    .then(res=>res.json()) ;  
  }
}