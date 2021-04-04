import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevisService {

  private apiUrl = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) { }

  getAllDevis(){
    let url = this.apiUrl+'/Devis/';
    return this.httpClient.get(url);
  }

  getDetailsDevisById(idDevis){
    let url = this.apiUrl+'/Devis/';
    url += idDevis;

    return this.httpClient.get(url);
  }

  generateDevis(campaignId){
    let url = this.apiUrl+'/Devis/generateDevisCampaign/';    

    return this.httpClient.post(url, campaignId);
  }

  getDevisByCampaignId(campaignId){
   
    let url = this.apiUrl+'/Devis/generateDevisCampaign/';
    url += campaignId;

    return this.httpClient.get(url);
  }

}



