import { Injectable } from "@nestjs/common";
import { ProductCategory } from "../entities/product-category";
import { ProductCategoryRepository } from "../repositories/product-category-repository";

interface UpdateProductCategoryRequest {
    category: ProductCategory
}

@Injectable()
export class UpdateProductCategory {

    constructor(
        private productCategoryRepository: ProductCategoryRepository
    ) { }

    async execute(request: UpdateProductCategoryRequest): Promise<void> {
        const { category } = request

        await this.productCategoryRepository.save(category)

    }
}