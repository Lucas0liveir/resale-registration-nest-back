import { AccountRepository } from "@application/accounts/repositories/account-repository";
import { CustomersRepository } from "@application/customers/repositories/customer-repository";
import { ProductCategoryRepository } from "@application/products-categories/repositories/product-category-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAccountRepository } from "./prisma/repositories/accounts/prisma-account-repository";
import { PrismaCustomersRepository } from "./prisma/repositories/customers/prisma-customers-repository";
import { PrismaProductCategoryRepository } from "./prisma/repositories/product-category/prisma-product-category-repository";

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
        },
        {
            provide: ProductCategoryRepository,
            useClass: PrismaProductCategoryRepository
        }
    ],
    exports: [
        AccountRepository,
        CustomersRepository,
        ProductCategoryRepository
    ]
})
export class DataBaseModule { }