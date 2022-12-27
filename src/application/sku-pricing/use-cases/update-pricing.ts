import { SkuRepository } from "@application/sku/repositories/sku-repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Pricing } from "../entities/pricing";
import { PricingRepository } from "../repositories/pricing-repository";

interface UpdatePricingRequest {
    id: string;
    userId: string;
    costPrice: number;
    price: number;
    skuId: string;
}

interface UpdatePricingResponse {
    pricing: Pricing;
}

@Injectable()
export class UpdatePricing {

    constructor(
        private pricingRepository: PricingRepository,
        private skuRepository: SkuRepository
    ) { }

    async execute(request: UpdatePricingRequest): Promise<UpdatePricingResponse> {
        const { id, userId, costPrice, price, skuId } = request
        const oldPricing = await this.pricingRepository.findById(id)

        if (!oldPricing || oldPricing.sku?.id !== skuId) {
            throw new BadRequestException("Acesso negado.")
        }

        const sku = await this.skuRepository.findById(skuId)

        if (sku.product?.userId !== userId) {
            throw new BadRequestException("Acesso negado.")
        }

        const pricing = new Pricing({
            costPrice,
            price,
            sku,
            createdAt: oldPricing.createdAt
        }, oldPricing.id)

        await this.pricingRepository.save(pricing)

        return { pricing }

    }
}