import { Brand } from "@application/product-brand/entities/brand";
import { BrandRepository } from "@application/product-brand/repositories/brand-repository";
import { ProductCategory } from "@application/products-categories/entities/product-category";
import { ProductCategoryRepository } from "@application/products-categories/repositories/product-category-repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Product } from "../entities/product";
import { ProductRepository } from "../repositories/product-repository";

interface EditProductRequest {
    id: string;
    name: string;
    description: string;
    userId: string;
    categoryId: string;
    brandId: string;
}

interface EditProductResponse {
    product: Product
}

@Injectable()
export class EditProduct {

    constructor(
        private productCategoryRepository: ProductCategoryRepository,
        private productRepository: ProductRepository,
        private brandRepository: BrandRepository
    ) { }

    async execute(request: EditProductRequest): Promise<EditProductResponse> {
        const { categoryId, brandId, description, name, id, userId } = request

        const category = await this.productCategoryRepository.findById(categoryId)
        const brand = await this.brandRepository.findById(brandId, userId)

        const product = await this.productRepository.findById(id, userId)

        if (!product) {
            throw new BadRequestException()
        }

        const editedProduct = new Product({
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
                updatedAt: category.updatedAt
            }, category.id),
            description,
            categoryId,
            createdAt: product.createdAt,
            userId
        }, id)

        await this.productRepository.save(editedProduct)

        return { product: editedProduct }
    }
}