import { Product } from "@application/products/entities/product";
import { ProductRepository } from "@application/products/repositories/product-repository";
import { Sku } from "@application/sku/entities/sku";
import { SkuRepository } from "@application/sku/repositories/sku-repository";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaProductMapper } from "../../mappers/product/prisma-product-mapper";
import { PrismaSkuMapper } from "../../mappers/sku/prisma-sku-mapper";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class PrismaSkuRepository implements SkuRepository {


    constructor(
        private prisma: PrismaService
    ) { }

    async create(sku: Sku): Promise<void> {
        const raw = PrismaSkuMapper.toPrisma(sku)

        try {

            await this.prisma.sKU.create({
                data: raw
            })

        } catch (e) {
            throw new BadRequestException(e.code)
        }
    }

    async findAllByProductId(productId: string): Promise<Sku[]> {

        const skus = await this.prisma.sKU.findMany({
            where: {
                product_id: productId
            },
            include: {
                product: {
                    select: {
                        id: true,
                        description: true,
                        name: true,
                        userId: true,
                        createdAt: true,
                        category_id: true,
                        updatedAt: true,
                        brand: true,
                        category: true,
                    }
                }
            }
        })

        return skus.map(PrismaSkuMapper.toDomain)
    }

    async save(sku: Sku): Promise<void> {

        const raw = PrismaSkuMapper.toPrisma(sku)

        await this.prisma.sKU.update({
            where: {
                id: raw.id
            },
            data: raw
        })
    }

}