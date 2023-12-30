import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductData } from '../shared/models/productData';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../shared/models/brand';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }
  public apiUrl = 'http://localhost:8080/api/products';

  getProducts(brandId?: number, typeId?: number, url?: string): Observable<ProductData>{
    // Construct the base URL
    const apiUrl = url || this.apiUrl;  
    
    return this.http.get<ProductData>(apiUrl);
  }
  
  getProduct(id: number){
    return this.http.get<Product>(this.apiUrl + "/"+ id);
  }

  getBrands() {
    const url = `${this.apiUrl}/brands`
    return this.http.get<Brand[]>(url);
  }

  getTypes() {
    const url = `${this.apiUrl}/types`
    return this.http.get<Brand[]>(url);
  }
}
