// import { Category } from "./category.model";

export class Product {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public category: string;
  public size: string;
  public fitting: string;
  public imageUrl: string;
  public quantity: number;

  constructor(id: number, name: string, description: string, price: number, 
    category: string, size: string, fitting: string, imageUrl:string, quantity:number = 1) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.category = category;
      this.size = size;
      this.fitting = fitting;
      this.imageUrl = imageUrl; 
      this.quantity = quantity;
    }
}
