import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromoCodeService } from "../services/promo-code.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products_in_cart: Product[] = [];
  public giftCardCode: string = '';
  public userIsLoggedIn: boolean = false;
  public amountOfProducts: number = 0;
  public errorNotLoggedInMessage: string = '';

  public totalPrice: number = 0;
  public shippingCosts: number = 4.95;
  private promoCodePercentageDiscount: number = 0;
  private promoCodeAmountDiscount: number = 0;
  private minimumAmount: number = 0;
  public discountAmount: number = 0;

  public orderEmail: string = '';
  public promoCode: string = '';
  public appliedPromoCode: string = '';

  quantity: number = 1;

  constructor(
      private cartService: CartService,
      private http: HttpClient,
      private router: Router,
      private promoCodeService: PromoCodeService
  ) {}

  ngOnInit() {
    this.products_in_cart = this.cartService.allProductsInCart() as Product[];
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.products_in_cart = products;
      this.reCalculateTotalPrice();
    });
    this.reCalculateTotalPrice();
  }

  onCheckCode(code: string) {
    this.promoCodeAmountDiscount = 0;
    this.promoCodePercentageDiscount = 0;
    this.discountAmount = 0;
    this.appliedPromoCode = '';

    if (!code) {
      alert('No promo code entered');
      return;
    }

    this.promoCodeService.getPromoCode(code).subscribe((promoCode) => {
      if (promoCode.expiryDate < new Date()) {
        alert('Promo code has expired');
        return;
      }

      if (promoCode.type == 'percentage') {
        this.promoCodePercentageDiscount = promoCode.discount / 100; // Convert percentage to a fraction
      } else {
        this.promoCodeAmountDiscount = promoCode.discount;
      }

      this.appliedPromoCode = code;
      this.minimumAmount = promoCode.minimumAmount;
      this.reCalculateTotalPrice(true);
    }, error => {
      alert('Invalid promo code');
    });
  }

  public applyDiscount(): void {
    this.totalPrice = this.totalPrice - this.discountAmount + this.shippingCosts;
  }

  public removeProductFromCart(product_index: number) {
    this.cartService.removeProductFromCart(product_index);
    this.reCalculateTotalPrice();
  }

  public clearCart() {
    this.cartService.clearCart();
    this.products_in_cart = [];
    this.appliedPromoCode = '';
    this.reCalculateTotalPrice();
  }

  placeOrder() {
    this.reCalculateTotalPrice();
    if (this.totalPrice > 0) {
      console.log('Bestelling geplaatst met e-mail:', this.orderEmail);
      this.promoCodeService.usePromoCode(this.appliedPromoCode).subscribe();
      alert(`Bestelling succesvol geplaatst!\nTotaal: €${this.totalPrice.toFixed(2)}`);
      this.clearCart();
      this.router.navigate(['/products']);
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

  reCalculateTotalPrice(onPromoCodeCheck: boolean = false) {
    this.totalPrice = this.cartService.getTotalPrice();

    if (this.promoCodeAmountDiscount > 0) {
      this.discountAmount = this.promoCodeAmountDiscount;
    } else if (this.promoCodePercentageDiscount > 0) {
      this.discountAmount = this.totalPrice * this.promoCodePercentageDiscount;
    }

    if (this.totalPrice > this.minimumAmount) {
      this.applyDiscount();
    } else {
      if (onPromoCodeCheck) {
        alert('Minimum amount not reached for promo code (' + this.minimumAmount + ')');
        this.promoCodeAmountDiscount = 0;
        this.promoCodePercentageDiscount = 0;
        this.appliedPromoCode = '';
      }
    }

  }
}
