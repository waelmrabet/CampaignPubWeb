import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  public currentUser: any;

  ngOnInit(): void {
  }

  public login(loginForm) {
    
    let userName = loginForm.value.userName;
    let password = loginForm.value.password;
    
    this.userService.login(userName, password)
      .subscribe(response => {        
        this.currentUser = response;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        let test = JSON.parse(localStorage.getItem('currentUser'));

        console.log("show current user from local storage");
        console.log(test);

        this.router.navigateByUrl('Dashbord');

      }, error => {
        console.log(error);
      });          
  }
}
