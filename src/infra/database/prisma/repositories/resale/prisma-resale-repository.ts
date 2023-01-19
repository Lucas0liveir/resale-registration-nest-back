import { Resale } from "@application/resale/entities/resale";
import { ResaleRepository } from "@application/resale/repositories/resale-repository";
import { Injectable } from "@nestjs/common";
import { PrismaResaleMapper } from "../../mappers/resale/prisma-resale-mapper";
import { PrismaService } from "../../prisma.service";


@Injectable()
export class PrismaResaleRespository implements ResaleRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async create(resale: Resale): Promise<void> {
        const rawResale = PrismaResaleMapper.toPrisma(resale)

        await this.prisma.resale.create({
            data: {
                ...rawResale.resale,
                installments: {
                    create: [
                        ...rawResale.installments
                    ]
                },
                products: {
                    create: [
                        ...rawResale.resaleSkus
                    ]
                }
            }
        })
    }

    async findById(id: string): Promise<Resale> {
        const resale = await this.prisma.resale.findUnique({
            where: {
                id
            },
            include: {
                installments: true,
                customer: true,
                products: {
                    select: {
                        quantity: true,
                        sku_id: true,
                        resale_id: true,
                        createdAt: true,
                        sku: true
                    }
                }
            }
        })

        return PrismaResaleMapper.toDomain(resale)
    }

    async findAllByUserId(userId: string): Promise<Resale[]> {

        const resale = await this.prisma.resale.findMany({
            where: {
                userId
            },
            include: {
                installments: true,
                customer: true,
                products: {
                    select: {
                        quantity: true,
                        sku_id: true,
                        resale_id: true,
                        createdAt: true,
                        sku: true
                    }
                }
            }
        })

        return resale.map(PrismaResaleMapper.toDomain)
    }

    async save(resale: Resale): Promise<void> {
        const rawResale = PrismaResaleMapper.toPrisma(resale)

        await this.prisma.resale.update({
            where: {
                id: resale.id
            },
            data: {
                ...rawResale.resale,
                installments: {
                    create: [
                        ...rawResale.installments
                    ]
                },
                products: {
                    create: [
                        ...rawResale.resaleSkus
                    ]
                }
            }
        })
    }

}