import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { AddressComponent } from './address/address.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { ReviewComponent } from './review/review.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CheckoutComponent,
    AddressComponent,
    ShipmentComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }
