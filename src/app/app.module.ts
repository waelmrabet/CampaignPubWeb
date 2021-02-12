import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationService } from './services/authentication.service';
import { ListUserComponent } from './components/list-user/list-user.component';
import { NouveauUserComponent } from './components/nouveau-user/nouveau-user.component';
import { ClientService } from './services/client.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NouveauClientComponent } from './components/nouveau-client/nouveau-client.component';
import { ListClientComponent } from './components/list-client/list-client.component';
import { DetailsClientComponent } from './components/details-client/details-client.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { NgSelectModule } from '@ng-select/ng-select';
//import { AgmCoreModule } from '@agm/core';
import { NouveauCompagnComponent } from './components/nouveau-compagn/nouveau-compagn.component';
import { DetailsCompagnComponent } from './components/details-compagn/details-compagn.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NouveauProductTypeComponent } from './components/nouveau-product-type/nouveau-product-type.component';
import { ListProductTypesComponent } from './components/list-product-types/list-product-types.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,   
    ListUserComponent,
    NouveauUserComponent,
    NouveauClientComponent,
    ListClientComponent,
    DetailsClientComponent,
    EditUserComponent,
    NouveauCompagnComponent,
    DetailsCompagnComponent, 

  
    NouveauProductTypeComponent, ListProductTypesComponent
       
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    ColorPickerModule
    /*,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBarLEdbGw8JnHOz6hRceCP8vyRRklFxr8',
      libraries: ['places']
    })*/
    
  ],
  providers: [
    DatePipe,
    AuthenticationService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
