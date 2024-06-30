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
                    promoCodes.push(new PromoCode(promoCode.code, promoCode.discount, promoCode.expiryDate, promoCode.usageCount, promoCode.type, promoCode.minimumAmount));
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
                    promoCodes.push(new PromoCode(promoCode.code, promoCode.discount, promoCode.expiryDate, promoCode.usageCount, promoCode.type, promoCode.minimumAmount));
                }
                return promoCodes;
            })
        );
    }

    public usePromoCode(code: string) {
        return this.http.post(this.baseUrl + "/use", { code: code }, { responseType: 'text' });
    }


    public getPromoCode(code: string) {
        return this.http.get<PromoCode>(this.baseUrl + "/get/" + code).pipe(
            map(responseData => {
                return new PromoCode(responseData.code, responseData.discount, responseData.expiryDate, responseData.usageCount, responseData.type, responseData.minimumAmount);
            })
        );
    }

    public createPromoCode(code: string, discount: number, type: string , minimumAmount: number = 0.0, validUntil: Date ) {
        const validUntilLocalDate = this.convertToLocalDate(validUntil);

        return this.http.post(this.baseUrl + "/create", { code, discount, type, minimumAmount, expiry_date : validUntilLocalDate }, { responseType: 'text' });
    }

    private convertToLocalDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    public deletePromoCode(code: string) {
        return this.http.post(this.baseUrl + "/delete", null, {
            params: {
                code: code
            },
            responseType: 'text'
        });
    }
}