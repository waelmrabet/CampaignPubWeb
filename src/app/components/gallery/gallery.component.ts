import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnChanges {

  @Input() businessId: any;
  @Input() campaignId: any;
  public showGallery = false;
  public gallery: any;
  public folderPath: any;
  public filesSite: any;

  constructor(private photoService: PhotoService) { }
  
  ngOnInit(): void {   
    this.filesSite = environment.campaignFilesSite; 
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(this.businessId != undefined){
      this.getBusinessGallery();      
    }      
  }

  getBusinessGallery(){

    let businessId = this.businessId;
    this.showGallery = false;

    this.photoService.getListPhotosByBusinessId(businessId)
    .subscribe(response=>{
      this.gallery = response; 
      this.showGallery = true;     
    });
  }
  
}
