import { Component, OnInit } from '@angular/core';
import { PromoCodeService } from '../services/promo-code.service';
import { PromoCode } from '../models/promo-code.model';
import {CommonModule, DatePipe, NgForOf} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-promo-codes',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    FormsModule,
    CommonModule
  ],
  templateUrl: './promo-codes.component.html',
  styleUrls: ['./promo-codes.component.scss']
})
export class PromoCodesComponent implements OnInit {

  activePromoCodes: PromoCode[] = [];
  inactivePromoCodes: PromoCode[] = [];

  promoCodeType: string = '';

  constructor(private promoCodeService: PromoCodeService) {}

  ngOnInit() {
    this.loadActivePromoCodes();
    this.loadInactivePromoCodes();
  }

  private loadActivePromoCodes() {
    this.promoCodeService.ActivePromoCodesObservable.subscribe(promoCodes => {
      this.activePromoCodes = promoCodes;
      console.log(promoCodes);
    });
  }

  private loadInactivePromoCodes() {
    this.promoCodeService.InactivePromoCodesObservable.subscribe(promoCodes => {
      this.inactivePromoCodes = promoCodes;
    });
  }

  public onCreatePromoCode(code: string, discount: number, minimumAmount : number, expiryString: string) {
    const expiryDate = new Date(expiryString);
    if(this.promoCodeType === 'percentage') {
      if(!(discount > 0 && discount <= 100)) {
        console.error('Invalid percentage discount')
        alert('Invalid percentage discount')
        return;
      }
    }
    this.promoCodeService.createPromoCode(code, discount, this.promoCodeType, minimumAmount || 0, expiryDate).subscribe({
      next: (response) => {
        console.log(response);
        this.loadActivePromoCodes();
        this.loadInactivePromoCodes();
      },
      error: (error) => {
        console.error('promo code creation failed', error);
      }
    });
  }

  onDeletePromoCode(code: string) {
    this.promoCodeService.deletePromoCode(code).subscribe({
      next: (response) => {
        console.log(response);
        this.loadActivePromoCodes();
        this.loadInactivePromoCodes();
      },
      error: (error) => {
        console.error('promo code deletion failed', error);
      }
    });
  }

  protected readonly Date = Date;
}
