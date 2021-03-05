import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private apiUrl: any = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  addCompaign(compagnDto: any) {
    let url = this.apiUrl + '/Campaign/';
    return this.httpClient.post(url, compagnDto);
  }

  getCampaignById(id: number) {

    let url = this.apiUrl + '/Campaign/';
    url += id;
    return this.httpClient.get(url);
  }

  getDetailedCampaignTownsList(campaignId){
    
    let url = this.apiUrl + '/Campaign/getCampaignTownMap/';
    url += campaignId;
    return this.httpClient.get(url);

  }



  /*------------------------------------------- Begin Campaign Products Services -------------------------------------------------*/

  deleteCampaignProduct(campaignId, productTypeId) {

    let url = this.apiUrl + '/Campaign/deleteCamapaignProduct/';

    url += campaignId + '/';
    url += productTypeId;

    return this.httpClient.delete(url);
  }

  updateCampaignProduct(campaignId, productUpdateDto) {

    let url = this.apiUrl + '/Campaign/updateCamapaignProduct/';
    url += campaignId;

    return this.httpClient.put(url, productUpdateDto);
  }

  addCampaignProduct(campaignId, productTypeId) {
    let url = this.apiUrl + '/Campaign/addCamapaignProduct/';

    url += campaignId + '/';
    url += productTypeId;

    return this.httpClient.get(url);
  }

  /*------------------------------------------- End Campaign Products Services -------------------------------------------------*/


  /*------------------------------------------- Begin Campaign Business types Services -------------------------------------------*/

  addCampaignBusinessType(campaignId, businessTypeMapCode){
    let url = this.apiUrl + '/Campaign/addCampaignBusinessType/';

    url += campaignId + '/';
    url += businessTypeMapCode;

    return this.httpClient.get(url);
  }

  deleteCampaignBusinessType(campaignId, BusinessTypeMapCode) {

    let url = this.apiUrl + '/Campaign/deleteCampaignBusinessType/';

    url += campaignId + '/';
    url += BusinessTypeMapCode;

    return this.httpClient.delete(url);
  }

  /*------------------------------------------- END Campaign Business types Services -------------------------------------------*/


  updateCampignGlobalParams(campaignId, campaignGlobalParmsUpdateDto){
    
    let url = this.apiUrl + '/Campaign/updateCampaignGlobalParams/';
    url += campaignId + '/';    

    return this.httpClient.put(url, campaignGlobalParmsUpdateDto);
  }


}
