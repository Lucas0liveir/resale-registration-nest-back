import { AccountRepository } from "@application/accounts/repositories/account-repository";
import { CustomersRepository } from "@application/customers/repositories/customer-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAccountRepository } from "./prisma/repositories/accounts/prisma-account-repository";
import { PrismaCustomersRepository } from "./prisma/repositories/customers/prisma-customers-repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: AccountRepository,
            useClass: PrismaAccountRepository
        },
        {
            provide: CustomersRepository,
            useClass: PrismaCustomersRepository
        }
    ],
    exports: [
        AccountRepository,
        CustomersRepository
    ]
})
export class DataBaseModule { }