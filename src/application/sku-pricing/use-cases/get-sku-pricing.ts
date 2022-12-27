import { SkuRepository } from "@application/sku/repositories/sku-repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Pricing } from "../entities/pricing";
import { PricingRepository } from "../repositories/pricing-repository";


interface GetSkuPricingRequest {
    skuId: string;
    userId: string;
}

interface GetSkuPricingResponse {
    pricing: Pricing
}

@Injectable()
export class GetSkuPricing {

    constructor(
        private skurepository: SkuRepository,
        private pricingRepository: PricingRepository
    ) { }

    async execute(request: GetSkuPricingRequest): Promise<GetSkuPricingResponse> {
        const { skuId, userId } = request

        const sku = await this.skurepository.findById(skuId)

        if (sku.product?.userId !== userId) {
            throw new BadRequestException("Acesso negado.")
        }

        const pricing = await this.pricingRepository.findBySkuId(skuId)

        return { pricing }
    }
}