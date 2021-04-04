import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';
import { DevisService } from 'src/app/services/devis.service';

@Component({
  selector: 'app-details-compagn',
  templateUrl: './details-compagn.component.html',
  styleUrls: ['./details-compagn.component.scss']
})
export class DetailsCompagnComponent implements OnInit {

  public campaign: any;
  public detailedTowns: any;

  public displayDetails:any = false;
  public campaignState: any;

  public campaignStates = [
    { stateId: 1, stateDescription: 'Brouillon' },
    { stateId: 2, stateDescription: 'En Cours' },
    { stateId: 3, stateDescription: 'Fini' },
    { stateId: 4, stateDescription: 'Annulée' }
  ];

  constructor(private campaignService: CampaignService, private devisService: DevisService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getFileCampaign();
  }

  getFileCampaign(){

    this.displayDetails = false;
    let campaignId = +this.activatedRoute.snapshot.paramMap.get("CampaignId");
    this.campaignService.getCampaignById(campaignId)
    .subscribe(response=>{
      this.campaign = response;      
      let index = this.campaignStates.findIndex(x => x.stateId === this.campaign.campaignState);
      this.campaignState = this.campaignStates[index];
      this.getDetailedCampaignTowns();
    }, error=>{
      console.log(error);
    });
  }

  getDetailedCampaignTowns(){
    let campaignId = +this.activatedRoute.snapshot.paramMap.get("CampaignId");

    this.campaignService.getDetailedCampaignTownsList(campaignId)
    .subscribe(response=>{
      this.detailedTowns = response;

      this.displayDetails = true;
    }, error =>{console.log(error);}
    ); 
  }

  countBusinessCost(){
    let businessCost = 0;

    //businessCost = this.campaign.campaignProducts.finalUnitPrice 
    this.campaign.campaignProducts.forEach(item => {
      businessCost += item.finalUnitPrice;
    });

    businessCost = businessCost * (this.campaign.penetraionRate / 100) ; 

    return businessCost;
  }

}
