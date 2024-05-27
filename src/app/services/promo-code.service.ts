import {Injectable} from "@angular/core";
import {PromoCode} from "../models/promo-code.model";
import {environment} from "../../environments/environment";
import {Product} from "../models/product.model";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class PromoCodeService {

    private baseUrl: string = environment.base_url + "/promo-codes";

    constructor(private http: HttpClient) {}

    get ActivePromoCodesObservable(): Observable<PromoCode[]> {
        return this.http.get<PromoCode[]>(this.baseUrl + "/active").pipe(
            map(responseData => {
                const promoCodes: PromoCode[] = [];
                for (const promoCode of responseData) {
                    promoCodes.push(new PromoCode(promoCode.code, promoCode.discount, promoCode.expiryDate, promoCode.usageCount));
                }
                return promoCodes;
            })
        );
    }

    get InactivePromoCodesObservable(): Observable<PromoCode[]> {
        return this.http.get<PromoCode[]>(this.baseUrl + "/inactive").pipe(
            map(responseData => {
                const promoCodes: PromoCode[] = [];
                for (const promoCode of responseData) {
                    promoCodes.push(new PromoCode(promoCode.code, promoCode.discount, promoCode.expiryDate, promoCode.usageCount));
                }
                return promoCodes;
            })
        );
    }

    public usedPromoCode(code: string) {
        return this.http.post(this.baseUrl + "/use", { code });
    }

    public createPromoCode(code: string, discount: number, validUntil: Date) {
        const validUntilLocalDate = this.convertToLocalDate(validUntil);
        return this.http.post(this.baseUrl + "/create", { code, discount, validUntilLocalDate });
    }

    private convertToLocalDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}