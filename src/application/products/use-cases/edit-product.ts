import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product";
import { ProductRepository } from "../repositories/product-repository";

interface EditProductRequest {
    id: string;
    name: string;
    description: string;
    userId: string;
    categoryId: string;
}

interface EditProductResponse {
    product: Product
}

@Injectable()
export class EditProduct {

    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(request: EditProductRequest): Promise<EditProductResponse> {
        const { categoryId, description, name, id, userId } = request

        const product = new Product({
            name,
            description,
            categoryId,
            userId
        }, id)

        await this.productRepository.save(product)
        
        return { product }
    }
}