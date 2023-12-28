import { Injectable } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Product } from '../shared/models/product';
import { StoreData } from '../shared/models/storeData';
import { Type } from '../shared/models/type';

@Injectable({
    providedIn: 'root'
})
export class StoreModelService implements StoreData {
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
}
