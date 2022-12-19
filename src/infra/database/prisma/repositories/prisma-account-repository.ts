import { User } from "@application/accounts/entities/User";
import { AccountRepository } from "@application/accounts/repositories/account-repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaAccountMapper } from "../mappers/prisma-account-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaAccountRepository implements AccountRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async createReseller(user: User) {
        const raw = PrismaAccountMapper.toPrisma(user)

        await this.prisma.user.create({
            data: raw
        })
    }

    create(user: User): void {
        throw new Error("Method not implemented.");
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) return null

        return PrismaAccountMapper.toDomain(user)
    }

    findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    save(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

}