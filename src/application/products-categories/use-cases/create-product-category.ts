import { Injectable } from "@nestjs/common";
import { ProductCategory } from "../entities/product-category";
import { ProductCategoryRepository } from "../repositories/product-category-repository";

interface CreatProductCategoryRequest {
    userId: string;
    name: string;
}

interface CreatProductCategoryResponse {
    category: ProductCategory;
}

@Injectable()
export class CreatProductCategory {

    constructor(
        private productCategoryRepository: ProductCategoryRepository
    ) { }

    async execute(request: CreatProductCategoryRequest): Promise<CreatProductCategoryResponse> {

        const { name, userId } = request

        const category = new ProductCategory({
            userId,
            name
        })

        await this.productCategoryRepository.create(category)

        return { category }
    }
}