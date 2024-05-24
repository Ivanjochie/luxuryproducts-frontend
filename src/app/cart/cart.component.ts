import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'] 
})
export class CartComponent implements OnInit {
  public products_in_cart: Product[] = [];
  public shippingCosts: number = 4.95;
  public totalPrice: number = 0;
  public orderEmail: string = ''; 
  quantity: number = 1;

  constructor(
    private cartService: CartService, 
    private http: HttpClient, 
    private router: Router
  ) {}

  ngOnInit() {
    this.products_in_cart = this.cartService.allProductsInCart() as Product [];
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.products_in_cart = products;
      this.calculateTotalPrice(); 
    });
    this.calculateTotalPrice(); 
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    if (this.products_in_cart.length > 0) {
    const productsTotal = this.products_in_cart.reduce((acc, product) => acc + product.price, 0);
    this.totalPrice = productsTotal + this.shippingCosts;
    }
  }

  public removeProductFromCart(product_index: number) {
    this.cartService.removeProductFromCart(product_index);
    this.calculateTotalPrice(); 
  }

  public clearCart() {
    this.cartService.clearCart();
    this.products_in_cart = [];
    this.calculateTotalPrice();
  }

  placeOrder() {
    this.calculateTotalPrice();
  
    if (this.totalPrice > 0 && this.totalPrice > 0) {
      console.log('Bestelling geplaatst met e-mail:', this.orderEmail);
      alert(`Bestelling succesvol geplaatst!\nTotaal: €${(this.totalPrice + this.shippingCosts).toFixed(2)}`);
      this.clearCart();
      this.router.navigate(['/order']);
    } else {
      alert('Voeg eerst producten toe aan je winkelwagen.');
    }
  }
  

  updateOrderEmail(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.orderEmail = input.value;
    }
  }

  public updateProductQuantity(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value, 10);
    if (quantity >= 0) {
      this.cartService.updateProductQuantity(index, quantity);
    }
  }
  
  

}
