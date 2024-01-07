import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { canActivate } from '../core/guards/auth.guard';
import { AddressComponent } from './address/address.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  {
    path:'', 
    component: CheckoutComponent,
    canActivate: [canActivate],
    children: [
      {path: 'address', component: AddressComponent, data:{breadcrumb: 'Address'}},
      {path: 'shipment', component: ShipmentComponent, data:{breadcrumb: 'Shipment'}},
      {path: 'review', component: ReviewComponent, data:{breadcrumb: 'Review'}},
      {path: '', redirectTo: 'address', pathMatch: 'full'} //deafulting to address step
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
