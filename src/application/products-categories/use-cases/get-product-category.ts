import { Injectable } from "@nestjs/common";
import { ProductCategory } from "../entities/product-category";
import { ProductCategoryRepository } from "../repositories/product-category-repository";

interface GetProductCategoryRequest {
    id: string
}

interface GetProductCategoryResponse {
    category: ProductCategory;
}

@Injectable()
export class GetProductCategory {

    constructor(
        private productCategoryRepository: ProductCategoryRepository
    ) { }

    async execute(request: GetProductCategoryRequest): Promise<GetProductCategoryResponse> {
        const { id } = request
        const category = await this.productCategoryRepository.findById(id)

        return { category }
    }
}