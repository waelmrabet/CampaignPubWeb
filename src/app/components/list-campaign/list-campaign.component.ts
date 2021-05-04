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
  public currentUser: any;

  public campaignStates = [
    { stateId: 1, stateDescription: 'Brouillon' },
    { stateId: 2, stateDescription: 'Validé' },
    { stateId: 3, stateDescription: 'En Cours' },
    { stateId: 4, stateDescription: 'Fini' },
    { stateId: 5, stateDescription: 'Annulée' }
  ];

  constructor(private campaignService: CampaignService, private router: Router) { }

  ngOnInit(): void {   
    this.setCurrentUser(); 
    this.getListCampaigns();
  }
  
  setCurrentUser(){
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  getCampaignStateDescription(campaignStateId){
    let index = this.campaignStates.findIndex(x => x.stateId === campaignStateId);
    
    if(index != -1)
      return this.campaignStates[index].stateDescription;

    return "";
  }


  getListCampaigns(){

    let roleId = this.currentUser.roleId;
    let clientId = roleId === 2 ? this.currentUser.clientId : -1;

    this.showList = false;    
    
    this.campaignService.getAllCampaignsList()
    .subscribe(response => {   
      
      let list: any = response;      
      
      if(roleId === 2)
        this.campaignsList = list.filter(x=> x.customerId == clientId);
      else
        this.campaignsList = list;
       
      this.showList = true;
    
    });

  }


  goToDetails(campaign){
    
    let pageUrl = campaign.campaignState === 1 ? "Edit_Compagne/" : "Details_File_Compagne/";
    this.router.navigateByUrl(pageUrl+ campaign.id);

  }

}
