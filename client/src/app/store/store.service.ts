import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductData } from '../shared/models/productData';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../shared/models/brand';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/api/products';

  getProducts(brandId?: number, typeId?: number): Observable<ProductData>{
    // Construct the base URL
    let url = `${this.apiUrl}?`;
  
    // Check if brandId is not 0, and add it to the URL
    if (brandId && brandId !== 0) {
      url += `brandId=${brandId}&`;
    }
  
    // Check if typeId is not 0, and add it to the URL
    if (typeId && typeId !== 0) {
      url += `typeId=${typeId}&`;
    }
  
    // Remove the trailing '&' if it exists
    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }  
    
    return this.http.get<ProductData>(url);
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
