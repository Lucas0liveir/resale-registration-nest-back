import { Injectable } from "@nestjs/common";
import { ProductCategory } from "../entities/product-category";
import { ProductCategoryRepository } from "../repositories/product-category-repository";

interface CreatProductCategoriesRequest {
    names: string[];
}

interface CreatProductCategoriesResponse {
    categories: ProductCategory[];
}

@Injectable()
export class CreatProductCategories {

    constructor(
        private productCategoryRepository: ProductCategoryRepository
    ) { }

    async execute(request: CreatProductCategoriesRequest): Promise<CreatProductCategoriesResponse> {
        
        const { names } = request

        const categories = names.map(name => {
            return new ProductCategory({
                name
            })
        })

        await this.productCategoryRepository.createMany(categories)

        return { categories }
    }
}