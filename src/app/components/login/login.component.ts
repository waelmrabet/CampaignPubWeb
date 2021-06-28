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


  ngOnInit(): void {
  }


  verifAuthetificationIdentiy(userName, password) {
    7

    let valid = true;
    let msg = "";

    if (userName == undefined || userName == '')
      valid = false;

    if (password == undefined || password == '')
      valid = false;

    if (!valid) {
      msg = "Veuillez saisir UserName et mot de passe !!";
      Swal.fire({
        title: "Erreur",
        text: msg,
        timer: 2000,
        icon: "error"
      });
    }

    return valid;

  }

  public login(loginForm) {

    let userName = loginForm.value.userName;
    let password = loginForm.value.password;

    let valid = this.verifAuthetificationIdentiy(userName, password);
    if (valid) {

      Swal.fire({
        title: '  Connexion en cours!',
        html: 'Attendez un peu',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading()
        },
      });

      this.userService.login(userName, password)
        .subscribe(response => {
          let rep: any = response;
          let user = rep.user;
          let token = rep.token;
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('jwtToken', token);
          Swal.close();
          this.router.navigateByUrl('Dashbord');
        }, error => {
          Swal.fire({
            title: "Erreur",
            text: error,
            icon: "error",
            timer: 1500,
          });
        });
    }







  }
}
