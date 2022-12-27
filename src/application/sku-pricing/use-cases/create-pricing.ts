import { SkuRepository } from "@application/sku/repositories/sku-repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Pricing } from "../entities/pricing";
import { PricingRepository } from "../repositories/pricing-repository";

interface CreatePricingRequest {
    userId: string;
    costPrice: number;
    price: number;
    skuId: string;
}

interface CreatePricingResponse {
    pricing: Pricing;
}

@Injectable()
export class CreatePricing {

    constructor(
        private pricingRepository: PricingRepository,
        private skuRepository: SkuRepository
    ) { }

    async execute(request: CreatePricingRequest): Promise<CreatePricingResponse> {
        const { userId, costPrice, price, skuId } = request

        const sku = await this.skuRepository.findById(skuId)

        if (sku.product?.userId !== userId) {
            throw new BadRequestException("Acesso negado.")
        }

        const pricing = new Pricing({
            costPrice,
            price,
            sku
        })

        await this.pricingRepository.create(pricing)

        return { pricing }

    }
}