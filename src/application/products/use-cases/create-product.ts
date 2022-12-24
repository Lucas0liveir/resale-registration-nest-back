import { Brand } from "@application/product-brand/entities/brand";
import { BrandRepository } from "@application/product-brand/repositories/brand-repository";
import { ProductCategory } from "@application/products-categories/entities/product-category";
import { ProductCategoryRepository } from "@application/products-categories/repositories/product-category-repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Product } from "../entities/product";
import { ProductRepository } from "../repositories/product-repository";

interface CreateProductRequest {
    name: string;
    description: string;
    userId: string;
    categoryId: string;
    brandId: string;
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
        const { categoryId, brandId, description, name, userId } = request

        const category = await this.productCategoryRepository.findById(categoryId)
        const brand = await this.brandRepository.findById(brandId, userId)

        if (!category || !brand) {
            throw new BadRequestException("Categoria ou marca inexistentes.")
        }

        const product = new Product({
            name,
            brand: new Brand({
                name: brand.name,
                userId,
                createdAt: brand.createdAt,
                updatedAt: brand.updatedAt
            }, brand.id),
            category: new ProductCategory({
                name: category.name,
                userId,
                createdAt: category.createdAt,
                updatedAt: category.createdAt
            }, category.id),
            description,
            categoryId,
            userId
        })

        await this.productRepository.create(product)

        return { product }
    }
}