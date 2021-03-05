import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-town-details',
  templateUrl: './campaign-town-details.component.html',
  styleUrls: ['./campaign-town-details.component.scss']
})
export class CampaignTownDetailsComponent implements OnInit {


  @Input() townMap:any;
  constructor() { }

  ngOnInit(): void {

    console.log(this.townMap);
  }

}
