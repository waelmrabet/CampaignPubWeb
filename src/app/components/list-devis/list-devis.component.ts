import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DevisService } from 'src/app/services/devis.service';

@Component({
  selector: 'app-list-devis',
  templateUrl: './list-devis.component.html',
  styleUrls: ['./list-devis.component.scss']
})
export class ListDevisComponent implements OnInit {

  public listDevis: any;
  constructor(private devisService: DevisService, router: Router) { }

  ngOnInit(): void {
  }

  getAllDevis(){

    /**Fix this in backEnd First */
    this.devisService.getAllDevis()
    .subscribe(response=>{
      this.listDevis = response;
    }, error=>{ 
      console.log(error);
    });
  }

  gotToDetails(devisId){
        
    console.log()
  }

}
