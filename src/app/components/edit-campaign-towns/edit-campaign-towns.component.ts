import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Place } from 'src/app/models/Place';

@Component({
  selector: 'app-edit-campaign-towns',
  templateUrl: './edit-campaign-towns.component.html',
  styleUrls: ['./edit-campaign-towns.component.scss']
})
export class EditCampaignTownsComponent implements OnInit {

  @Input() detailedCampaignTownsList: any; 
  public selectedTown: any;

  public centerMapPosition: any;
  public placesList : any[];
  
  constructor() { }

  ngOnInit(): void {     
  }

  // modal params
  setModalTown(detailedTown){
    if(detailedTown != undefined){
      this.selectedTown = detailedTown;
      this.setCenterMapPosition();
      this.setPlacesList();
    }
      
  }

  // set map center
  setCenterMapPosition(){

    if(this.selectedTown != undefined){
      this.centerMapPosition = {
        lat: this.selectedTown.town.lat,
        lng: this.selectedTown.town.lng      
      }      
    }    
  }

  // set map Places
  setPlacesList(){
    if(this.selectedTown.townBusinesses){
      
      this.placesList = [];
     
      this.selectedTown.townBusinesses.forEach(item=> {
        
        let place: Place = {
          lat: item.place.lat,
          lng: item.place.lng,
          label: item.place.name,
          draggable: false
        }

        this.placesList.push(place);

      });
    
    }
  }


}
