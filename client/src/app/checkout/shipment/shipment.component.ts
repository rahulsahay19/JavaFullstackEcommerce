import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { DeliveryOption } from 'src/app/shared/models/deliveryOptions';
import { CheckoutComponent } from '../checkout.component';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss'],
})
export class ShipmentComponent {
  deliveryOptions: DeliveryOption[] = [
    {
      id: 1,
      name: 'Fedex',
      deliveryTime: '2 days',
      description: 'Fast delivery',
      price: 300,
    },
    {
      id: 2,
      name: 'DTDC',
      deliveryTime: '3 days',
      description: 'Reliable delivery',
      price: 200,
    },
    {
      id: 3,
      name: 'First Flight',
      deliveryTime: '4 days',
      description: 'Economical delivery',
      price: 150,
    },
    {
      id: 4,
      name: 'Normal',
      deliveryTime: '7 days',
      description: 'Standard delivery',
      price: 100,
    },
  ];

  selectedOption: number | undefined;
  shipmentForm: FormGroup;
  constructor(
    private basketService: BasketService,
    private formBuilder: FormBuilder,
    private router: Router,
    private checkoutComponent: CheckoutComponent
  ) {
    this.shipmentForm = this.formBuilder.group({
      selectedOption: [this.selectedOption, Validators.required],
    });

    //Initialize this selected option
    this.selectedOption = this.deliveryOptions[0].id;
    this.updateShipmentPrice();
  }
  updateShipmentPrice(){
    const selectedDeliveryOption = this.deliveryOptions.find(
      (option)=>option.id === this.selectedOption
    );
    if(selectedDeliveryOption){
      this.basketService.updateShippingPrice(selectedDeliveryOption.price);
    }
  }
  goToNextStep(){
      this.updateShipmentPrice();
      //Navigate to review page
      this.router.navigate(['/checkout/review']);
      //set the current step to review
      this.checkoutComponent.setCurrentStep('review');
    
  } 
}
