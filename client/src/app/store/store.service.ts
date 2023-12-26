import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductData } from '../shared/models/productData';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../shared/models/brand';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/api/products';

  getProducts(): Observable<ProductData>{
    return this.http.get<ProductData>(this.apiUrl);        
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