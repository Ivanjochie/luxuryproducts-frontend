export class PromoCode {
    public code: string;
    public discount: number;
    public expiryDate: Date;
    public usageCount: number;

    constructor(code: string, discount: number, expiryDate: Date, currentUses: number) {
        this.code = code;
        this.discount = discount;
        this.expiryDate = expiryDate;
        this.usageCount = currentUses;
    }
}