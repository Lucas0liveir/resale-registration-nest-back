import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product";
import { ProductRepository } from "../repositories/product-repository";

interface GetUserProductsRequest {
    userId: string
}

interface GetUserProductsResponse {
    products: Product[]
}

@Injectable()
export class GetUserProducts {

    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(request: GetUserProductsRequest): Promise<GetUserProductsResponse> {
        const { userId } = request

        const products = await this.productRepository.findAllByUserId(userId)

        return { products }
    }
}