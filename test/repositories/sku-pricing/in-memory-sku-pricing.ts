import { Pricing } from "@application/sku-pricing/entities/pricing";
import { PricingRepository } from "@application/sku-pricing/repositories/pricing-repository";
import { BadRequestException } from "@nestjs/common";


export class InMemoryPricingRepository extends PricingRepository {

    public pricing: Pricing[] = []

    async create(pricing: Pricing): Promise<void> {
        this.pricing.push(pricing)
    }

    async findById(id: string): Promise<Pricing> {
        return this.pricing.find(item => item.id === id)
    }

    async findBySkuId(skuId: string): Promise<Pricing> {
        return this.pricing.find(item => item.sku.id === skuId)
    }

    async save(pricing: Pricing): Promise<void> {
        const index = this.pricing.findIndex(item => item.id === pricing.id)

        if (index >= 0) {
            this.pricing[index] = pricing
        } else {
            throw new BadRequestException("Preço inexistente")
        }
    }

}