import { ProductCategory } from "@application/products-categories/entities/product-category";
import { ProductCategoryRepository } from "@application/products-categories/repositories/product-category-repository";
import { Injectable } from "@nestjs/common";
import { PrismaProductCategoryMapper } from "../../mappers/product-category/prisma-product-category.mapper";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class PrismaProductCategoryRepository implements ProductCategoryRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async createMany(productCategories: ProductCategory[]): Promise<void> {
        const raw = productCategories.map(PrismaProductCategoryMapper.toPrisma)

        await this.prisma.product_Category.createMany({
            data: raw
        })
    }

    async findAll(): Promise<ProductCategory[]> {
        const categories = await this.prisma.product_Category.findMany()

        return categories.map(PrismaProductCategoryMapper.toDomain)
    }

    async save(productCategory: ProductCategory): Promise<void> {
        const raw = PrismaProductCategoryMapper.toPrisma(productCategory)

        await this.prisma.product_Category.update({
            where: {
                id: raw.id
            },
            data: raw
        })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.product_Category.delete({
            where: {
                id
            }
        })
    }

}