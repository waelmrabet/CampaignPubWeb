import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-product-type',
  templateUrl: './details-product-type.component.html',
  styleUrls: ['./details-product-type.component.scss']
})
export class DetailsProductTypeComponent implements OnInit {

  public productType;
  public modalProductType;
  public displayDetails: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

}
