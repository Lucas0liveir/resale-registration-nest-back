import { Product } from "@application/products/entities/product";
import { ProductRepository } from "@application/products/repositories/product-repository";
import { BadRequestException } from "@nestjs/common";
import { isTemplateMiddle } from "typescript";

export class InMemoryProductRepository extends ProductRepository {

    public products: Product[] = []

    async create(product: Product): Promise<void> {
        await this.products.push(product)
    }

    async findAllByUserId(userId: string): Promise<Product[]> {
        return await this.products.filter(item => item.userId === userId)
    }

    async findById(id: string): Promise<Product> {
        return await this.products.find(item => item.id === id)
    }

    async save(product: Product): Promise<void> {
        const productIndex = await this.products.findIndex(item => item.id === product.id)

        if (productIndex >= 0) {
            this.products[productIndex] = product
        } else {
            throw new BadRequestException("Produto inexistente")
        }
    }

    async deleteByUserId(userId: string, productId: string): Promise<void> {
        const productIndex = await this.products.findIndex(item => item.id === productId && item.userId === userId)

        if (productIndex >= 0) {
            this.products.splice(productIndex, 1)
        } else {
            throw new BadRequestException("Produto inexistente")
        }
    }


}