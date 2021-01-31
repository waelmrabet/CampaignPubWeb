import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nouveau-user',
  templateUrl: './nouveau-user.component.html',
  styleUrls: ['./nouveau-user.component.scss']
})
export class NouveauUserComponent implements OnInit {

  public roles = [{ roleId: 1, desc: 'Admin' }, { roleId: 2, desc: 'Client' }];
  public selectedRoleId: any;
  public customersList: any;
  public selectedCustomerId: any;
  public usersList;
  public showusersList;

  constructor(private userService: UserService, private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllClients();
  }

  getAllClients() {
    this.clientService.getAllClient()
      .subscribe(response => {
        this.customersList = response;
      }, error => {
        Swal.fire("Erreur", "Erreur de chargement list client", "error");
      });
  }

  addCustomUser = (term) => ({ id: term, name: term });

  buildUser(userFormValue) {

    let userDto: User = new User();

    userDto.firstName = userFormValue.firstName;
    userDto.lastName = userFormValue.lastName;
    userDto.matricule = userFormValue.matricule;
    userDto.Email = userFormValue.mail;

    userDto.telNumber = userFormValue.telNumber;
    userDto.role = this.selectedRoleId;
    userDto.password = userFormValue.password;
    userDto.clientId = userDto.role == 2 ? this.selectedCustomerId : -1;

    return userDto;

  }

  verifUserForm(userForm) {
    let valid = true;
    let message = '';

    if (!userForm.valid) {
      message = 'Veuillez renseigner tous les champs obligatoires !';
      valid = false;
    }

    if (userForm.value.password !== userForm.value.confirmePassword) {
      message = 'mot de passe de confirmation non valide !';
      valid = false;
    }

    if (!valid)
      Swal.fire('Erreur', message, 'error');

    return valid;



  }

  public ajouterUtilisateur(userForm) {

    let valid = this.verifUserForm(userForm);
    if (valid) {

      Swal.fire({
        title: 'êtes-vous sûr de vouloir continuer?',
        text: 'Ajout nouveau utilisateur!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, ajouter!',
        cancelButtonText: 'Non, Annuler'
      }).then((result) => {
        if (result.value) {

          let userDto = this.buildUser(userForm.value);
          this.userService.addUser(userDto)
            .subscribe(response => {
              Swal.fire(
                'Ajouté!',
                'Le nouveau utilisateur a été ajouté avec succès.',
                'success'
              ).then(() => {
                this.router.navigateByUrl('Lst_Utilisateur');
              });

            }, error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erreur serveur!'
              });
            });
        }
      })

    }

  }

  public getAllUsers() {

    this.showusersList = false;
    this.userService.getAllUsers()

      .subscribe(
        response => {
          this.usersList = response;
          this.showusersList = true;
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erreur serveur!'
          });
        }


      )
  }

}
