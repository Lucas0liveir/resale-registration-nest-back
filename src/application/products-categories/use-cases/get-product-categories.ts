import { Injectable } from "@nestjs/common";
import { ProductCategory } from "../entities/product-category";
import { ProductCategoryRepository } from "../repositories/product-category-repository";

interface GetProductCategoriesRequest {
    userId: string;
}

interface GetProductCategoriesResponse {
    categories: ProductCategory[];
}

@Injectable()
export class GetProductCategories {

    constructor(
        private productCategoryRepository: ProductCategoryRepository
    ) { }

    async execute(request: GetProductCategoriesRequest): Promise<GetProductCategoriesResponse> {
        const { userId } = request
        
        const categories = await this.productCategoryRepository.findAll(userId)

        return { categories }
    }
}