import { Component, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product:Product | null = null;

  constructor(private basketService: BasketService){}

  additemToBasket(){
    this.product && this.basketService.addItemToBasket(this.product);
  }
  //Method to extract the image name from pictureUrl
  extractImageName(): string | null{
    if(this.product && this.product.pictureUrl){
      const parts = this.product.pictureUrl.split('/');
      if(parts.length>0){
        return parts[parts.length-1]; //It will return the last part
      }
    }
    return null; //if its invalid, then return null
  }
}
