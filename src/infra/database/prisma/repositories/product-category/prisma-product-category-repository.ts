import { ProductCategory } from "@application/products-categories/entities/product-category";
import { ProductCategoryRepository } from "@application/products-categories/repositories/product-category-repository";
import { BadRequestException, Injectable } from "@nestjs/common";
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

    async findById(id: string): Promise<ProductCategory> {
        const productCategory = await this.prisma.product_Category.findUnique({
            where: {
                id
            }
        })

        return PrismaProductCategoryMapper.toDomain(productCategory)
    }

    async save(productCategory: ProductCategory): Promise<void> {
        const raw = PrismaProductCategoryMapper.toPrisma(productCategory)

        try {
            await this.prisma.product_Category.update({
                where: {
                    id: raw.id
                },
                data: raw
            })
        } catch (e) {
            throw new BadRequestException("Categoria não encontrada")
        }
    }

    async delete(id: string): Promise<void> {

        try {
            await this.prisma.product_Category.delete({
                where: {
                    id
                }
            })
        } catch (e) {
            throw new BadRequestException("Categoria não encontrada")
        }

    }

}