import { Component, OnInit } from '@angular/core';
import { PromoCodeService } from '../services/promo-code.service';
import { PromoCode } from '../models/promo-code.model';
import { DatePipe, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-promo-codes',
    standalone: true,
    imports: [
        DatePipe,
        NgForOf,
        FormsModule
    ],
    templateUrl: './promo-codes.component.html',
    styleUrls: ['./promo-codes.component.scss']
})
export class PromoCodesComponent implements OnInit {

    activePromoCodes: PromoCode[] = [];
    inactivePromoCodes: PromoCode[] = [];

    constructor(private promoCodeService: PromoCodeService) {}

    ngOnInit() {
        this.loadActivePromoCodes();
        this.loadInactivePromoCodes();
    }

    private loadActivePromoCodes() {
        this.promoCodeService.ActivePromoCodesObservable.subscribe(promoCodes => {
            this.activePromoCodes = promoCodes;
        });
    }

    private loadInactivePromoCodes() {
        this.promoCodeService.InactivePromoCodesObservable.subscribe(promoCodes => {
            this.inactivePromoCodes = promoCodes;
        });
    }

    public onCreatePromoCode(code: string, discount: number, expiryString: string) {
        const expiryDate = new Date(expiryString);
        this.promoCodeService.createPromoCode(code, discount, expiryDate).subscribe({
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

    protected readonly Date = Date;
}
