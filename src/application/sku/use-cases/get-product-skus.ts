import { ProductRepository } from "@application/products/repositories/product-repository"
import { BadRequestException, Injectable } from "@nestjs/common"
import { Sku } from "../entities/sku"
import { SkuRepository } from "../repositories/sku-repository"

interface GetProductSkusRequest {
    productId: string;
    userId: string;
}

interface GetProductSkusResponse {
    skus: Sku[]
}

@Injectable()
export class GetProductSkus {

    constructor(
        private skuRepository: SkuRepository,
        private productRepository: ProductRepository
    ) { }

    async execute(request: GetProductSkusRequest): Promise<GetProductSkusResponse> {
        const { productId, userId } = request

        const product = await this.productRepository.findById(productId, userId)

        if (!product) {
            throw new BadRequestException("Acesso negado.")
        }

        const skus = await this.skuRepository.findAllByProductId(product.id)

        return { skus }
    }
}