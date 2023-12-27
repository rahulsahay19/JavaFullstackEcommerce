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
  selectedBrand: Brand | null = null;
  selectedType: Type | null = null;
  @Input() title: string = '';
  ngOnInit() {
    // Initialize selected brand and type to "All"
    this.selectedBrand = { id: 0, name: 'All' };
    this.selectedType = { id: 0, name: 'All' };

    // Check if both selectedBrand and selectedType are "All" before making the initial fetch
  if (this.selectedBrand.id === 0 && this.selectedType.id === 0) {
    this.fetchProducts(); // Fetch all records without brand and type filtering
  } else {
    // Fetch products with the selected brand and type
    this.fetchProducts();
  }
    this.getBrands();
    this.getTypes();
  }

  fetchProducts(){
    //Pass the selected brand/type ids
    const brandId = this.selectedBrand?.id;
    const typeId = this.selectedType?.id;

    this.storeService.getProducts(brandId, typeId).subscribe({
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

  selectBrand(brand: Brand){
    //update the selected brand and fetch the products
    this.selectedBrand = brand;
    this.fetchProducts();
  }

  selectType(type: Type){
    //update the selected brand and fetch the products
    this.selectedType = type;
    this.fetchProducts();
  }
}
