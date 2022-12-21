import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../repositories/product-repository";

interface DeleteUserProductRequest {
    userId: string;
    productId: string;
}


@Injectable()
export class DeleteUserProduct {

    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(request: DeleteUserProductRequest) {
        const { userId, productId } = request

        await this.productRepository.deleteByUserId(userId, productId)
        
    }
}