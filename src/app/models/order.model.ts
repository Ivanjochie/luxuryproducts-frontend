import { Product } from "./product.model";

export interface Order {
    id: number;
    userEmail: string;
    products: Product[];
    totalPrice: number;
}