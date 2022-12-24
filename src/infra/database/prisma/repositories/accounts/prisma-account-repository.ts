import { User } from "@application/accounts/entities/User";
import { AccountRepository } from "@application/accounts/repositories/account-repository";
import { Injectable } from "@nestjs/common";
import { PrismaAccountMapper } from "../../mappers/account/prisma-account-mapper";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class PrismaAccountRepository implements AccountRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async createRefreshToken(userId: string, token: string) {
        await this.prisma.refreshToken.create({
            data: {
                token,
                userId
            }
        })
    }

    async findRefreshTokenByUserId(userId: string): Promise<string> {

        const refreshToken = await this.prisma.refreshToken.findFirst({
            where: {
                userId: userId
            }
        })

        if (!refreshToken) {
            return null
        }

        return refreshToken.token
    }

    async updateRefreshToken(userId: string, token: string) {

        await this.prisma.refreshToken.update({
            where: {
                userId
            },
            data: {
                token
            }

        })
    }

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