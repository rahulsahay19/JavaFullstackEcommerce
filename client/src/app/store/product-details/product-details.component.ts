import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { StoreService } from '../store.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity: number = 1;

  constructor(
    private storeService: StoreService,
    private activateRoute: ActivatedRoute,
    private breadcrumb: BreadcrumbService,
    private basketService: BasketService,
    private toastr: ToastrService){}
  
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if(id){
      this.storeService.getProduct(+id).subscribe({
        next: product=> {
          this.product = product
          this.breadcrumb.set('@productName', product.name);
        },
        error: error => console.log(error)
      });
    }
  }
  addToCart() {
    if (this.product) {
      this.basketService.addItemToBasket(this.product, this.quantity);
      this.toastr.success('Item added to cart'); 
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
