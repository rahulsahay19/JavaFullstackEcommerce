import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from './store.service';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

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
  selectedSort = 'asc'; //default value
  search = '';
  
  currentPage = 1;
  page?: number;
  pageable: any; // This will hold pagination information
  totalElements: number = 70; // Total number of elements
  pageSize: number = 10; // Number of items per page


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

  pageChanged(event: PageChangedEvent): void {
    // Check if the page has actually changed
    if (event.page !== this.currentPage) {
      this.currentPage = event.page;
      this.fetchProducts(this.currentPage);
    }
  }
  

  fetchProducts(page: number = 1) {
    // Calculate the backend page (subtract 1)
    const backendPage = page - 1;
  
    // Pass the selected brand/type ids
    const brandId = this.selectedBrand?.id;
    const typeId = this.selectedType?.id;
  
    // Construct the base URL
    let url = `${this.storeService.apiUrl}?`;
  
    // Check the brand and type
    if (brandId && brandId !== 0) {
      url += `brandId=${brandId}&`;
    }
  
    if (typeId && typeId !== 0) {
      url += `typeId=${typeId}&`;
    }
  
    // Search
    if (this.search) {
      url += `keyword=${this.search}&`;
    }
  
    // Append backendPage and size parameters to the URL
    url += `page=${backendPage}&size=${this.pageSize}`;
  
    // Include sorting parameters only when selectedSort is not empty
    if (this.selectedSort !== 'asc') {
      url += `&sort=name&order=${this.selectedSort}`;
    }
  
    this.storeService.getProducts(brandId, typeId, url).subscribe({
      next: (data) => {
        this.products = data.content;
        this.pageable = data.pageable;
        this.totalElements = data.totalElements;
        this.currentPage = data.pageable.pageNumber + 1; // Adjust the currentPage
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
  onSortChange(){
    this.fetchProducts();
  }
  onSearch(){
    this.fetchProducts();
  }
  onReset(){
    this.search = '';
    this.fetchProducts();
  }
}
