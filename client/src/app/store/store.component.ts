import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from './store.service';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  constructor(private storeService: StoreService) {}
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  @Input() title: string = '';
  ngOnInit() {
    //we will be calling store service
    this.fetchProducts();
    this.getBrands();
    this.getTypes();
  }

  fetchProducts(){
    this.storeService.getProducts().subscribe({
      next: (data) => {
        this.products = data.content;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }
  getBrands(){
    this.storeService.getBrands().subscribe({
      next:(response)=>(this.brands = [{id: 0, name:'All'}, ...response]),
      error:(error) =>console.log(error)
    });
  }
  getTypes(){
    this.storeService.getTypes().subscribe({
      next:(response)=>(this.types = [{id: 0, name:'All'}, ...response]),
      error:(error) =>console.log(error)
    });
  }
}
