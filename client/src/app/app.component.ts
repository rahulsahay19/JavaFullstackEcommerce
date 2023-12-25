import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { ProductData } from './models/productData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Sports Center';
  products: Product[] = [];
  constructor(private http: HttpClient){}
 
  ngOnInit() {
    this.http
        .get<ProductData>('http://localhost:8080/api/products')
        .subscribe({
          next:(data)=>{
            this.products = data.content;
          },
          error:(error) =>{
            console.error('Error fetching data:', error);
          }
        })
  }
}
