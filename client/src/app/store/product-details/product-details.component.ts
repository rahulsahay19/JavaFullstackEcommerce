import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { StoreService } from '../store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity: number = 1;

  constructor(private storeService: StoreService, private activateRoute: ActivatedRoute){}
  
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if(id){
      this.storeService.getProduct(+id).subscribe({
        next: product=> this.product = product,
        error: error => console.log(error)
      });
    }
  }
  extractImageName(): string | null{
    if(this.product && this.product.pictureUrl){
      const parts = this.product.pictureUrl.split('/');
      if(parts.length>0){
        return parts[parts.length-1]; // fetch the last part after /
      }
    }
    return null;
  }
  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    if(this.quantity>1){
      this.quantity--;
    }
  }
}
