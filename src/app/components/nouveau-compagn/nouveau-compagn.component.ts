import { Component, OnInit } from '@angular/core';
import { BusinessTypeService } from 'src/app/services/business-type.service';
import { ClientService } from 'src/app/services/client.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { RegionService } from 'src/app/services/region.service';
import { TownService } from 'src/app/services/town.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nouveau-compagn',
  templateUrl: './nouveau-compagn.component.html',
  styleUrls: ['./nouveau-compagn.component.scss']
})
export class NouveauCompagnComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom: number;

  public clientList: any;
  public selectedClientId: any;

  public regionsList: any;
  public selectedRegionId: any;

  public productTypeList: any;
  public selectedProductTypeId: any;

  public townsList: any;
  public selectedTownsIds: any;


  public businessTypeList: any;
  public selectedBusnissTypes: any;

  constructor(private clientService: ClientService,
    private productTypeService: ProductTypeService,
    private regionService: RegionService,
    private townService: TownService,
    private businessTypeService : BusinessTypeService) { }

  ngOnInit(): void {
    //this.setCurrentLocation();
    this.getAllClient();
    this.getAllProductType();
    this.getAllRegions();
    this.getAllBusinessTypes();
  }

  getAllBusinessTypes(){
    this.businessTypeService.getAllBusinessTypes()
    .subscribe(response=>{
      this.businessTypeList = response;
    }, error=>{
      console.log(error);
    });
  }

  getTownsBySelectedRegion() {

    let regionId = this.selectedRegionId;
    let fullEntity = false;

    if (!isNaN(regionId) && regionId > 0) {

      this.townService.getTownsByRegion(regionId, fullEntity)
        .subscribe(response => {
          this.townsList = response;
        }, error => {
          console.log(error);         
        });
    }
  }

  getAllRegions() {
    this.regionService.getAllRegions()
      .subscribe(response => {
        this.regionsList = response;
      }, error => {
        console.log(error);
      });


  }

  public submit(f) {
    console.log(f.value);
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }




  public getAllClient() {
    this.clientService.getAllClient()
      .subscribe(data => {
        this.clientList = data
      }, error => {
        console.log(error);

      });
  };


  public getAllProductType() {
    this.productTypeService.getAllProductTypes()
      .subscribe(data => {
        this.productTypeList = data;
      }, error => {
        console.log(error);
      });
  }

}
