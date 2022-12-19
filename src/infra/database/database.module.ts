import { AccountRepository } from "@application/accounts/repositories/account-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAccountRepository } from "./prisma/repositories/prisma-account-repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: AccountRepository,
            useClass: PrismaAccountRepository
        }
    ],
    exports: [
        AccountRepository
    ]
})
export class DataBaseModule { }