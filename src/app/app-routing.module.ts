import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { LoginComponent } from './components/login/login.component';
import { NouveauUserComponent } from './components/nouveau-user/nouveau-user.component';

import { ListClientComponent } from './components/list-client/list-client.component';
import { NouveauClientComponent } from './components/nouveau-client/nouveau-client.component';
import { DetailsClientComponent } from './components/details-client/details-client.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { NouveauCompagnComponent } from './components/nouveau-compagn/nouveau-compagn.component';
import { NouveauProductTypeComponent } from './components/nouveau-product-type/nouveau-product-type.component';
import { ListProductTypesComponent } from './components/list-product-types/list-product-types.component';
import { EditCampaignComponent } from './components/edit-campaign/edit-campaign.component';




const routes: Routes = [
  { path : 'login', component : LoginComponent },  
  { path: 'tableauDeBord' , component : DashboardComponent}, 
  
  { path: 'Nve_Client', component : NouveauClientComponent},
  { path: 'Lst_Client', component : ListClientComponent},
  { path: 'Details_Client/:CustomerId', component : DetailsClientComponent},  

  { path: 'Nve_Utilisateur', component : NouveauUserComponent},
  { path: 'Lst_Utilisateur', component : ListUserComponent},
  { path: 'editUser/:UserId', component: EditUserComponent},

  { path: 'Nve_Compagne', component : NouveauCompagnComponent},
  { path: 'Lst_Compagne', component : ListUserComponent},
  { path: 'Edit_Compagne', component : EditCampaignComponent},

  { path: 'Nve_Type_Produit', component : NouveauProductTypeComponent},
  { path: 'Lst_Types_Produits', component : ListProductTypesComponent},
    
  { path : '', component : DashboardComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
