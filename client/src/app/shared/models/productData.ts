import { Product } from "./product";

export interface ProductData {
    content: Product[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        // Add other properties as needed
      };
      totalElements: number;
}