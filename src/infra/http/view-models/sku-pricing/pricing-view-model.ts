import { Pricing } from "@application/sku-pricing/entities/pricing";


export class PricingViewModel {

    static toHTTP(pricing: Pricing) {
        return {
            id: pricing.id,
            costPrice: pricing.costPrice,
            price: pricing.price,
            skuId: pricing.sku.id
        }
    }
}