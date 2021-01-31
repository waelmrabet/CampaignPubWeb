import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from 'src/app/services/product-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product-types',
  templateUrl: './list-product-types.component.html',
  styleUrls: ['./list-product-types.component.scss']
})
export class ListProductTypesComponent implements OnInit {

  public productTypesList : any;
  public showList = false;

  constructor(private productTypesService : ProductTypeService) { }

  ngOnInit(): void {
    this.getAllProductTypes();
  }

  public getAllProductTypes(){

    this.showList = false;
    this.productTypesService.getAllProductTypes()
    
    .subscribe(
      response=>{
        this.productTypesList = response;
        this.showList =true;
    }, error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erreur serveur!'
      });
    }
    
    
    )
  }

}
