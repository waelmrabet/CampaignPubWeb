import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthenticationService, private router :Router) { }

  public authStatus; 

  ngOnInit(): void {
    this.authStatus = this.authService.isAuthenticated;
  }

  public login(){
    this.authStatus= this.authService.SignIn();  
    this.router.navigateByUrl('tableauDeBord');     //('tableauDeBord')  
  }

  public logout(){
    this.authStatus= this.authService.SignOut();    
  }

}
