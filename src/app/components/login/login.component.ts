import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { title } from 'process';
import { timer } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  // public currentUser: any;

  ngOnInit(): void {
  }

  public login(loginForm) {

    Swal.fire({
      title: 'Attendez un peu  !',
      html: 'Connexion en cours',
      showConfirmButton: false,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });

    let userName = loginForm.value.userName;
    let password = loginForm.value.password;

    this.userService.login(userName, password)
      .subscribe(response => {
        let user = response;

        localStorage.setItem('currentUser', JSON.stringify(user));
        //this.userService.userSubject.next(user);
      
        Swal.close();

        this.router.navigateByUrl('Dashbord');
      }, error => {
        console.log(error);
      });    
    
    
  }
}
