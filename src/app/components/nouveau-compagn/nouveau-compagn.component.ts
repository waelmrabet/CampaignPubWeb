import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CompaignCreateDto } from 'src/app/models/CompaignCreateDto';
import { BusinessTypeService } from 'src/app/services/business-type.service';
import { ClientService } from 'src/app/services/client.service';
import { CampaignService as CampaignService } from 'src/app/services/campaign.service';
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
  public selectedProductTypeIds: any;

  public townsList: any;
  public selectedTownsIds: any;

  public dateExecution: any;

  public businessTypeList: any;
  public selectedBusnissTypes: any;

  constructor(
    private datePipe: DatePipe,
    private clientService: ClientService,
    private productTypeService: ProductTypeService,
    private regionService: RegionService,
    private townService: TownService,
    private businessTypeService: BusinessTypeService,
    private campaignService: CampaignService,
    private router: Router) { }

  ngOnInit(): void {
    //this.setCurrentLocation();    
    this.dateExecution = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.getAllClient();
    this.getAllProductType();
    this.getAllRegions();
    this.getAllBusinessTypes();

  }

  getAllBusinessTypes() {
    this.businessTypeService.getAllBusinessTypes()
      .subscribe(response => {
        this.businessTypeList = response;
      }, error => {
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

  buildCompaignDto(value: any) {

    let compaignDto = new CompaignCreateDto();

    compaignDto.title = value.title;
    compaignDto.goal = value.goal;

    compaignDto.customerId = this.selectedClientId;
    compaignDto.forecastBudget = value.forecastBudget;

    compaignDto.regionId = this.selectedRegionId;
    compaignDto.townsIds = this.selectedTownsIds;

    compaignDto.businessTypesIds = this.selectedBusnissTypes;
    compaignDto.productTypeIds = this.selectedProductTypeIds;

    compaignDto.executionDate = value.dateExecution;    
    compaignDto.description = value.description;

    return compaignDto;


  }


  // verif and detect missed required fields
  verifForm(f: NgForm) {
    let valid = f.valid;
    let errorMsg = "Les champs suivants sont obligatoires:";

    if (f.value.title == "") {
      valid = false;
      errorMsg += "<br> Titre";
    }

    if (f.value.goal == "") {
      valid = false;
      errorMsg += "<br> Objectif";
    }

    if (this.selectedClientId == undefined) {
      valid = false;
      errorMsg += "<br> Client";
    }

    if (f.value.forecastBudget == "" || f.value.forecastBudget == null) {
      valid = false;
      errorMsg += "<br> Budget prévisionel";
    }

    if (this.selectedRegionId == undefined) {
      valid = false;
      errorMsg += "<br>Region";
    }

    if (this.selectedTownsIds == undefined) {
      valid = false;
      errorMsg += "<br> Ville";
    }

    if (this.selectedBusnissTypes == undefined) {
      valid = false;
      errorMsg += "<br> Type de business";
    }

    if (this.selectedProductTypeIds == undefined) {
      valid = false;
      errorMsg += "<br> Type de produit";
    }

    if (f.value.dateExecution == "" || f.value.dateExecution == undefined) {
      valid = false;
      errorMsg += "<br> Date d'éxecution";
    }

    if (f.value.description == "") {
      valid = false;
      errorMsg += "<br> Description";
    }

    if (!valid) {
      Swal.fire("Erreur", errorMsg, "error");
    }

    return valid;
  }

  public submit(f: NgForm) {

    let valid = this.verifForm(f);

    if (valid) {

      Swal.fire({
        title: 'êtes-vous sûr de vouloir continuer?',
        text: 'Ajout nouveau compagne de publiciatire!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, ajouter!',
        cancelButtonText: 'Non, Annuler'
      })
      .then((result) => {
        if (result.value) {

          let compaignCreateDto = this.buildCompaignDto(f.value);

          // model to send
          console.log(compaignCreateDto);

          this.campaignService.addCompaign(compaignCreateDto)
            .subscribe(response => {
              Swal.fire(
                'Ajouté!',
                'Le nouveau compagne a été crée avec succès.',
                'success'
              ).then(() => {
                this.router.navigateByUrl('');
              });

            }, error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erreur serveur!'
              });
            });
        }

      });

    }


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
