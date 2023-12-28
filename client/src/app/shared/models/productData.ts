import { Product } from "./product";

export interface ProductData {
    content: Product[];
    pageable: {
        pageNumber: number;
        pageSize: number;       
      };
      totalElements: number;
}