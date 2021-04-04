import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.component.html',
  styleUrls: ['./list-campaign.component.scss']
})
export class ListCampaignComponent implements OnInit {


  public showList:any = false;
  public campaignsList:any;

  public campaignStates = [
    { stateId: 1, stateDescription: 'Brouillon' },
    { stateId: 2, stateDescription: 'En Cours' },
    { stateId: 3, stateDescription: 'Fini' },
    { stateId: 4, stateDescription: 'Annulée' }
  ];

  constructor(private campaignService: CampaignService, private router: Router) { }

  ngOnInit(): void {
    this.getListCampaigns();
  }

  getCampaignStateDescription(campaignStateId){
    let index = this.campaignStates.findIndex(x => x.stateId === campaignStateId);
    
    if(index != -1)
      return this.campaignStates[index].stateDescription;

    return "";
  }


  getListCampaigns(){

    this.showList = false;    
    
    this.campaignService.getAllCampaignsList()
    .subscribe(response => {
      this.campaignsList = response;
      this.showList = true;
    });

  }


  gotToDetails(campaign){
    
    let pageUrl = campaign.campaignState === 1 ? "Edit_Compagne/" : "Details_File_Compagne/";
    this.router.navigateByUrl(pageUrl+ campaign.id);

  }

}
