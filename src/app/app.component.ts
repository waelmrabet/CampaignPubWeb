import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CompagnWebApp';
  public menusList: any;
  public currentUser: any;

  constructor(private router: Router, private upperCasePipe: UpperCasePipe, private userService: UserService) {
    //this.currentUser = this.userService.getCurrentConnectedUser();
   }

  ngOnInit(): void { }

  getConnectedUserName() {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let userName = currentUser ? this.upperCasePipe.transform(currentUser.lastName) + ' ' + currentUser.firstName : '';

    return userName;

  }

  getEspaceName(){
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let espaceName = '';

    if (currentUser) {
      if (currentUser.roleId == 1)
      espaceName = "Admin"
      else if(currentUser.roleId == 2)
      espaceName = "Client";
      else
      espaceName = "Agent"
    }

    return espaceName;
  }

  

  // Do not touch this code please
  isHidden() {
   
    let user = JSON.parse(localStorage.getItem("currentUser"));

    if(user == null || user == undefined){
      this.currentUser == undefined;
      return true;
    }else{
      
      if(this.currentUser == undefined || this.currentUser == null)
        this.currentUser = user;          
      
      if(this.menusList == null || this.menusList == undefined)
        this.menusList = user.menus;   

      return false;
    }    
  }

  logout() {
    this.userService.logout();
    this.currentUser = null;
    this.menusList = null;
    this.router.navigateByUrl('login');    
    
  }

}
