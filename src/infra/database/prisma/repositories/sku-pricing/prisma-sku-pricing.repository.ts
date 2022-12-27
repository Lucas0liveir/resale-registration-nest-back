import { Pricing } from "@application/sku-pricing/entities/pricing";
import { PricingRepository } from "@application/sku-pricing/repositories/pricing-repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaSkuPricingMapper } from "../../mappers/sku-pricing/prisma-sku-pricing-mapper";
import { PrismaService } from "../../prisma.service";


@Injectable()
export class PrismaPricingRepository implements PricingRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async create(pricing: Pricing): Promise<void> {

        try {
            const raw = PrismaSkuPricingMapper.toPrisma(pricing)

            await this.prisma.pricing.create({
                data: raw
            })
            
        } catch (e) {
            throw new BadRequestException("Seu sku já possui um preço vinculado.")
        }
    }

    async findById(id: string): Promise<Pricing> {
        const pricing = await this.prisma.pricing.findUnique({
            where: {
                id
            },
            include: {
                sku: {
                    select: {
                        createdAt: true,
                        ean: true,
                        especification: true,
                        height: true,
                        id: true,
                        min_stock: true,
                        name: true,
                        stock: true,
                        updatedAt: true,
                        weight: true,
                        width: true,
                        product_id: true,
                        product: {
                            select: {
                                id: true,
                                brand_id: true,
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
                }
            }
        })

        return PrismaSkuPricingMapper.toDomain(pricing)
    }

    async findBySkuId(skuId: string): Promise<Pricing> {
        const pricing = await this.prisma.pricing.findUnique({
            where: {
                sku_id: skuId
            },
            include: {
                sku: {
                    select: {
                        createdAt: true,
                        ean: true,
                        especification: true,
                        height: true,
                        id: true,
                        min_stock: true,
                        name: true,
                        stock: true,
                        updatedAt: true,
                        weight: true,
                        width: true,
                        product_id: true,
                        product: {
                            select: {
                                id: true,
                                brand_id: true,
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
                }
            }
        })

        return PrismaSkuPricingMapper.toDomain(pricing)
    }

    async save(pricing: Pricing): Promise<void> {
        const raw = PrismaSkuPricingMapper.toPrisma(pricing)

        await this.prisma.pricing.update({
            where: {
                id: pricing.id
            },
            data: raw
        })
    }

}