import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { Subscription, Observable } from 'rxjs';
import { ProjectVO } from '../project';

@Injectable() 
export class ProjectManagerService{

    constructor(public http:Http)
    {

    }
baseUrl: string = 'http://localhost:8080/';
getProjects(): Promise<any>{
  return this.http.get(this.baseUrl+"getProjects")
   .toPromise()
   .then(res=>res.json());
   
}

getProjectById(id): Observable<any>{
  return this.http.get(this.baseUrl+"getProject?id="+id);
   
}



deleteProject(id): Promise<any>{
  return this.http.delete(this.baseUrl+"deleteProject?id="+id)
   .toPromise()
   .then(res=>res.json());
}

 addProjectInfo(
  project : ProjectVO): Promise<any>{

      let body = JSON.stringify( project );            
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers : headers});

    return this.http.post( this.baseUrl+"addProject", body, options )
    .toPromise()
    .then(res=>res.json()) ;  
  }

  updateProjectInfo(
    project : ProjectVO): Promise<any>{

      let body = JSON.stringify( project );            
        let headers = new Headers({ 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'});
        let options = new RequestOptions({ headers : headers});

    return this.http.post( this.baseUrl+"updateProject", body, options )
    .toPromise()
    .then(res=>res.json()) ;  
  }
}