import { Brand } from "@application/sku-brand/entities/brand";
import { BrandRepository } from "@application/sku-brand/repositories/brand-repository";
import { Injectable } from "@nestjs/common";
import { PrismaBrandMapper } from "../../mappers/brand/prisma-brand.mapper";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class PrismaBrandRepository implements BrandRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async create(brand: Brand): Promise<void> {

        const raw = PrismaBrandMapper.toPrisma(brand)

        await this.prisma.brand.create({
            data: raw
        })
    }

    async findAllByUserId(userId: string): Promise<Brand[]> {

        const brands = await this.prisma.brand.findMany({
            where: {
                userId
            }
        })

        return brands.map(PrismaBrandMapper.toDomain)
    }

    async findById(id: string): Promise<Brand> {

        const brand = await this.prisma.brand.findUnique({
            where: {
                id
            }
        })

        return PrismaBrandMapper.toDomain(brand)
    }

    async save(brand: Brand): Promise<void> {
        const raw = PrismaBrandMapper.toPrisma(brand)

        await this.prisma.brand.update({
            where: {
                id: raw.id
            },
            data: raw
        })
    }

}