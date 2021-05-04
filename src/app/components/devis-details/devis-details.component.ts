import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevisService } from 'src/app/services/devis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devis-details',
  templateUrl: './devis-details.component.html',
  styleUrls: ['./devis-details.component.scss']
})
export class DevisDetailsComponent implements OnInit {

  public showDetails: any;
  public details:any;

  constructor(private activatedRoute: ActivatedRoute, private devisService: DevisService) { }

  ngOnInit(): void {
    this.getDevisDetails();
  }

  getDevisDetails(){
    let devisId = this.activatedRoute.snapshot.params.DevisId;
    this.showDetails = false;


    Swal.fire({
      title: 'Chargement en cours!',
      html: 'Attendez un peu',
      showConfirmButton: false,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });

    this.devisService.getDetailsDevisById(devisId)
    .subscribe(response=>{
        this.details = response;
        this.showDetails = true;
        Swal.close();
    },error=>{
      console.log(error);
    }
    )
    
  }

}
