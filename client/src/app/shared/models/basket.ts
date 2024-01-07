import { createId } from "@paralleldrive/cuid2"

export interface Basket {
    id: string
    items: BasketItem[]
  }
  
  export interface BasketItem {
    id: number
    name: string
    description: string
    price: number
    pictureUrl: string
    productBrand: string
    productType: string
    quantity: number
  }
  
  export class Basket implements Basket{
    id = createId();
    items: BasketItem[] = [];
  }

  export interface BasketTotals{
    shipping: number;
    subtotal: number;
    total: number;
  }