import { Pricing } from "../entities/pricing";

export abstract class PricingRepository {
    abstract create(pricing: Pricing): Promise<void>;
    abstract findById(id: string): Promise<Pricing>;
    abstract findBySkuId(skuId: string): Promise<Pricing>;
    abstract save(pricing: Pricing): Promise<void>;
}