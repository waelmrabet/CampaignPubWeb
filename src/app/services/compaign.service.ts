import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaignService {
  
  private apiUrl: any = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  addCompaign(compagnDto: any){
    let url = this.apiUrl+'/Compaign/';
    return this.httpClient.post(url, compagnDto);
  }

}
