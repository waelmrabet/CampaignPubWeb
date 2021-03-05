import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BusinessTypeService } from 'src/app/services/business-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-campaign-business-types',
  templateUrl: './edit-campaign-business-types.component.html',
  styleUrls: ['./edit-campaign-business-types.component.scss']
})
export class EditCampaignBusinessTypesComponent implements OnInit {


  @Input() campaignBusinessTypes:any;
  @Output() deletecampaignBusinessTypeEmmiter = new EventEmitter<string>();
  @Output() addCampaignBusinessTypeEmmiter = new EventEmitter<string>();

  public businessTypeList: any;
  public selectedBusnissType: any;
  
  
  constructor(private businessTypeService : BusinessTypeService) { }

  ngOnInit(): void {

    this.getAllBusinessTypes();
  }

  deleteBusinessType(mapCode){
    this.deletecampaignBusinessTypeEmmiter.emit(mapCode);
  }

  getAllBusinessTypes() {

    this.selectedBusnissType = undefined;

    this.businessTypeService.getAllBusinessTypes()
      .subscribe(response => {
        this.businessTypeList = response;
      }, error => {
        console.log(error);
      });
  }

  addCampaignBusinessType(){
    if(this.selectedBusnissType != undefined){    
      let index = this.campaignBusinessTypes.findIndex(x => x.productTypeId == this.selectedBusnissType);
     
      if(index === -1){

        let businessTypeMapCode = this.selectedBusnissType;
        this.addCampaignBusinessTypeEmmiter.emit(businessTypeMapCode); 
        this.selectedBusnissType = undefined;
      }
      else{
        Swal.fire("Erreur","Type de business Existe Déja", "error");
      }
    }else{
      Swal.fire("Erreur", "Veuillez selectionnez un type de business", "error");
    }
  }

}
