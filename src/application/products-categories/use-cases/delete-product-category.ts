import { Injectable } from "@nestjs/common";
import { ProductCategoryRepository } from "../repositories/product-category-repository";

interface DeleteProductCategoryRequest {
    id: string
}

@Injectable()
export class DeleteProductCategory {

    constructor(
        private productCategoryRepository: ProductCategoryRepository
    ) { }

    async execute(request: DeleteProductCategoryRequest): Promise<void> {
        const { id } = request
        
        await this.productCategoryRepository.delete(id)

    }
}