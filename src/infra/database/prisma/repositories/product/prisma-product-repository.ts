import { Product } from "@application/products/entities/product";
import { ProductRepository } from "@application/products/repositories/product-repository";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaProductMapper } from "../../mappers/product/prisma-product-mapper";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class PrismaProductRepository implements ProductRepository {


    constructor(
        private prisma: PrismaService
    ) { }

    async create(product: Product): Promise<void> {
        const raw = PrismaProductMapper.toPrisma(product)

        try {

            await this.prisma.product.create({
                data: raw
            })

        } catch (e) {
            throw new BadRequestException("Usuário não existe não encontrado")
        }
    }

    async findAllByUserId(userId: string): Promise<Product[]> {

        const products = await this.prisma.product.findMany({
            where: {
                userId
            },
            include: {
                category: true,
                brand: true
            }
        })

        return products.map(PrismaProductMapper.toDomain)
    }

    async findById(id: string, userId: string): Promise<Product> {

        const product = await this.prisma.product.findUnique({
            where: {
                id
            },
            include: {
                category: true,
                brand: true
            }
        })

        if (product.userId !== userId) {
            return null
        }

        return PrismaProductMapper.toDomain(product)
    }

    async deleteByUserId(userId: string, productId: string): Promise<void> {
        const product = await this.prisma.product.findUnique({ where: { id: productId } })

        if (product.userId !== userId) {
            throw new UnauthorizedException("Acesso negado.")
        }

        await this.prisma.product.delete({
            where: {
                id: product.id
            }
        })
    }

    async save(product: Product): Promise<void> {

        const raw = PrismaProductMapper.toPrisma(product)

        const isValidProduct = await this.findById(raw.id, raw.userId)

        if (!isValidProduct) {
            throw new UnauthorizedException("Acesso negado.")
        }

        await this.prisma.product.update({
            where: {
                id: raw.id
            },
            data: {
                category_id: raw.category_id,
                updatedAt: raw.updatedAt,
                description: raw.description,
                name: raw.name
            }
        })
    }

}