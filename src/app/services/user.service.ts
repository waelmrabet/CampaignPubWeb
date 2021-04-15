import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;
  
  public userSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;


  constructor(private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.userSubject.asObservable();
  }

  getCurrentConnectedUser(){
    return this.userSubject.value;
  }

  login(userName, password) {

    let url = this.apiUrl + '/User/Login';
    let identity: any = {
      userName: userName,
      password: password
    };

    return this.httpClient.post(url, identity);
  }

  logout(){
    localStorage.removeItem("currentUser");
    this.userSubject.next(null);    
  }

  addUser(user: User): Observable<any> {
    let url = this.apiUrl + '/User';
    return this.httpClient.post<any>(url, user);
  }

  getAllUsers() {
    let url = this.apiUrl + '/User';
    return this.httpClient.get(url);
  }

  getUserById(userId: number) {
    let url = this.apiUrl + '/User/';
    return this.httpClient.get(url + userId);
  }

  updateUser(id, editeduser) {
    let url = this.apiUrl + '/User/';
    return this.httpClient.put(url + id, editeduser);
  }

}
