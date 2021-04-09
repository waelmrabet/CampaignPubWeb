import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CompagnWebApp';

  public isConnected;

  public menusList: any;
  public currentUser: any;

  constructor(private router: Router, private upperCasePipe: UpperCasePipe) { }

  ngOnInit(): void { }

  getConnectedUserName() {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let userName = currentUser ? this.upperCasePipe.transform(currentUser.lastName) + ' ' + currentUser.firstName : '';

    return userName;

  }

  getUserProfile() {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let profile = '';

    if (currentUser) {
      if (currentUser.role == 1)
        profile = "Admin"
      else
        profile = "Client";
    }

    return profile;

  }

  getListMenuesByProfile(user) {
    let list = [1, 2, 3, 4];
    this.menusList = list;
  }


  // Do not touch this code please
  isHidden() {

    let user = JSON.parse(localStorage.getItem("currentUser"));

    if(this.currentUser == undefined || this.currentUser == null && user != null){
      this.currentUser = user;
      this.getListMenuesByProfile(user);
    }

    if (user)
      return false;
    else
      return true;

  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUser = null;
    this.menusList = null;
    this.router.navigateByUrl('login');
  }

}
