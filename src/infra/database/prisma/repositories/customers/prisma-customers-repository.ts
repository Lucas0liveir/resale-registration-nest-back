import { Customer } from "@application/customers/entities/customer";
import { CustomersRepository } from "@application/customers/repositories/customer-repository";
import { Injectable } from "@nestjs/common";
import { PrismaCustomersMapper } from "../../mappers/customers/prisma-customers.mapper";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class PrismaCustomersRepository implements CustomersRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async create(customer: Customer): Promise<void> {

        const raw = PrismaCustomersMapper.toPrisma(customer)

        await this.prisma.customer.create({
            data: raw
        })
    }

    async findByUserId(userId: string): Promise<Customer[]> {

        const customers = await this.prisma.customer.findMany({
            where: {
                userId
            }
        })

        return customers.map(PrismaCustomersMapper.toDomain)
    }

    async findById(id: string): Promise<Customer> {

        const customer = await this.prisma.customer.findUnique({
            where: {
                id
            }
        })

        return PrismaCustomersMapper.toDomain(customer)
    }

    async save(customer: Customer): Promise<void> {
        const raw = PrismaCustomersMapper.toPrisma(customer)

        await this.prisma.customer.update({
            where: {
                id: raw.id
            },
            data: raw
        })
    }

}