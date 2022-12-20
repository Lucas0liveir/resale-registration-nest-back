import { Injectable } from "@nestjs/common";
import { ProductCategory } from "../entities/product-category";
import { ProductCategoryRepository } from "../repositories/product-category-repository";

interface GetProductCategoriesResponse {
    categories: ProductCategory[];
}

@Injectable()
export class GetProductCategories {

    constructor(
        private productCategoryRepository: ProductCategoryRepository
    ) { }

    async execute(): Promise<GetProductCategoriesResponse> {
        const categories = await this.productCategoryRepository.findAll()

        return { categories }
    }
}