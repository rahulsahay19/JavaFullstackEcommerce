import { Brand } from "./brand";
import { Product } from "./product";
import { Type } from "./type";

export interface StoreData {
  products: Product[];
  brands: Brand[];
  types: Type[];
  selectedBrand: Brand | null;
  selectedType: Type | null;
  selectedSort: string;
  search: string;  
  currentPage: number;
  page?: number;
  pageable: any; 
  totalElements: number;
  pageSize: number;
}