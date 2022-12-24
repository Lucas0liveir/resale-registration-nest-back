import { Injectable } from "@nestjs/common";
import { ProductCategoryRepository } from "../repositories/product-category-repository";

interface DeleteProductCategoryRequest {
    userId: string;
    id: string;
}

@Injectable()
export class DeleteProductCategory {

    constructor(
        private productCategoryRepository: ProductCategoryRepository
    ) { }

    async execute(request: DeleteProductCategoryRequest): Promise<void> {
        const { id, userId } = request

        await this.productCategoryRepository.delete(id, userId)

    }
}