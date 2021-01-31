import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isAuthenticated = false;

  constructor() { }

  public SignIn() {
    this.isAuthenticated = true;
    return this.isAuthenticated;
  }

  public SignOut() {
    this.isAuthenticated = false;
    return this.isAuthenticated;
  }

}
