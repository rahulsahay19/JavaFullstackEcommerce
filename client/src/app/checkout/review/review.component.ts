import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, BasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  basket: Basket | null = new Basket();
  
  constructor(public basketService: BasketService, private router: Router){}
  
  ngOnInit(): void {
    this.basketService.basketSource$.subscribe((basket) =>{
      this.basket = basket;
    })
  }

  extractImageName(item: BasketItem): string | null{
    if(item && item.pictureUrl){
      const parts = item.pictureUrl.split('/');
      if(parts.length>0){
        return parts[parts.length-1];
      }
    }
    return null;
  }
  submitOrder(){
    this.basketService.clearBasket();
    this.router.navigate(['/store']);
  }

}
