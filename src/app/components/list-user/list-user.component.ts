import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  public usersList;
  public showusersList;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(){

    this.showusersList = false;
    this.userService.getAllUsers()
    
    .subscribe(
      response=>{
        this.usersList = response;
        this.showusersList =true;
    }, error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erreur serveur!'
      });
    }
    
    
    )
  }

  public gotToDetails(user){
    this.router.navigateByUrl('editUser/'+user.id);
  }

}
