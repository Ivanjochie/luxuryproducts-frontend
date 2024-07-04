export class PromoCode {
    public code: string;
    public discount: number;
    public expiryDate: Date;
    public type : string;
    public minimumAmount: number;
    public usageCount: number;

    constructor(code: string, discount: number, expiryDate: Date, currentUses: number, type: string, minimumAmount: number) {
        this.code = code;
        this.discount = discount;
        this.expiryDate = expiryDate;
        this.type = type;
        this.minimumAmount = minimumAmount;
        this.usageCount = currentUses;
    }
}