import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product";
import { ProductRepository } from "../repositories/product-repository";

interface CreateProductRequest {
    name: string;
    description: string;
    userId: string;
    categoryId: string;
}

interface CreateProductResponse {
    product: Product
}

@Injectable()
export class CreateProduct {

    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
        const { categoryId, description, name, userId } = request

        const product = new Product({
            name,
            description,
            categoryId,
            userId
        })

        await this.productRepository.create(product)

        return { product }
    }
}