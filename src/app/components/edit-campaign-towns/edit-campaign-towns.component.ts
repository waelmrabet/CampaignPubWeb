import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-campaign-towns',
  templateUrl: './edit-campaign-towns.component.html',
  styleUrls: ['./edit-campaign-towns.component.scss']
})
export class EditCampaignTownsComponent implements OnInit {

  @Input() detailedCampaignTownsList: any; 

  public selectedTown: any;

  constructor() { }

  ngOnInit(): void { 

    //this.selectedTown = this.detailedCampaignTownsList[0];
    console.log(this.detailedCampaignTownsList);      
  }

  // modal params
  setModalTown(detailedTown){
    if(detailedTown != undefined)
      this.selectedTown = detailedTown;
  }


}
