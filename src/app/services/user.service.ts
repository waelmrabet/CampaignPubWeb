import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;
  constructor(private httpClient : HttpClient) { }

  addUser(user : User) : Observable<any> {
    let url = this.apiUrl +'/User';
    return this.httpClient.post<any>(url, user);    
  }

  getAllUsers() {
    let url = this.apiUrl +'/User';
    return this.httpClient.get(url);
  }

  getUserById(userId : number){
    let url = this.apiUrl +'/User/';
    return this.httpClient.get(url+userId);
  }

  updateUser(id, editeduser){
    let url = this.apiUrl+'/User/';
    return this.httpClient.put(url + id, editeduser);
  }

}
