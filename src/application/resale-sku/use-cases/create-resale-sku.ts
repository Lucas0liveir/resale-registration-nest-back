import { SkuRepository } from "@application/sku/repositories/sku-repository";
import { Injectable } from "@nestjs/common";
import { ResaleSku } from "../entities/resale-sku";

interface CreateResaleSkuRequest {
    resaleForm: {
        skuId: string;
        quantity: number;
    }[];
    resaleId: string;
}

interface CreateResaleSkuResponse {
    resaleSkus: ResaleSku[]
}

@Injectable()
export class CreateResaleSku {

    constructor(
        private skuRepository: SkuRepository
    ) { }

    async execute(request: CreateResaleSkuRequest): Promise<CreateResaleSkuResponse> {
        const { resaleForm, resaleId } = request

        const resaleSkus = await Promise.all(resaleForm.map(async item => {
            let sku = await this.skuRepository.findById(item.skuId)

            return new ResaleSku({
                sku,
                quantity: item.quantity,
                resaleId
            })

        }))
        
        return { resaleSkus }

    }
}