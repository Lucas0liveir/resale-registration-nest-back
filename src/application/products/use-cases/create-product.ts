import { Brand } from "@application/product-brand/entities/brand";
import { BrandRepository } from "@application/product-brand/repositories/brand-repository";
import { ProductCategory } from "@application/products-categories/entities/product-category";
import { ProductCategoryRepository } from "@application/products-categories/repositories/product-category-repository";
import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product";
import { ProductRepository } from "../repositories/product-repository";

interface CreateProductRequest {
    name: string;
    description: string;
    userId: string;
    categoryId?: string;
    categoryName?: string;
    brandId?: string;
    brandName?: string;
}

interface CreateProductResponse {
    product: Product
}

@Injectable()
export class CreateProduct {

    constructor(
        private productCategoryRepository: ProductCategoryRepository,
        private productRepository: ProductRepository,
        private brandRepository: BrandRepository
    ) { }

    async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
        const { categoryId, categoryName, brandId, brandName, description, name, userId } = request

        let category = await this.productCategoryRepository.findById(categoryId ?? 'null')
        let brand = await this.brandRepository.findById(brandId ?? 'null', userId)

        if (!category) {

            category = new ProductCategory({
                name: categoryName,
                userId
            })

            await this.productCategoryRepository.create(category)
        }

        if (!brand) {

            brand = new Brand({
                name: brandName,
                userId
            })

            await this.brandRepository.create(brand)
        }

        const product = new Product({
            name,
            brand,
            category,
            description,
            categoryId,
            userId
        })

        await this.productRepository.create(product)

        return { product }
    }
}