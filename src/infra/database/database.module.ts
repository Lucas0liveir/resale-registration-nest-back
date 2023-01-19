import { AccountRepository } from "@application/accounts/repositories/account-repository";
import { CustomersRepository } from "@application/customers/repositories/customer-repository";
import { BrandRepository } from "@application/product-brand/repositories/brand-repository";
import { ProductCategoryRepository } from "@application/products-categories/repositories/product-category-repository";
import { ProductRepository } from "@application/products/repositories/product-repository";
import { ResaleRepository } from "@application/resale/repositories/resale-repository";
import { PricingRepository } from "@application/sku-pricing/repositories/pricing-repository";
import { SkuRepository } from "@application/sku/repositories/sku-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAccountRepository } from "./prisma/repositories/accounts/prisma-account-repository";
import { PrismaBrandRepository } from "./prisma/repositories/brand/prisma-brand-repository";
import { PrismaCustomersRepository } from "./prisma/repositories/customers/prisma-customers-repository";
import { PrismaProductCategoryRepository } from "./prisma/repositories/product-category/prisma-product-category-repository";
import { PrismaProductRepository } from "./prisma/repositories/product/prisma-product-repository";
import { PrismaResaleRespository } from "./prisma/repositories/resale/prisma-resale-repository";
import { PrismaPricingRepository } from "./prisma/repositories/sku-pricing/prisma-sku-pricing.repository";
import { PrismaSkuRepository } from "./prisma/repositories/sku/prisma-sku-repository";

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
        },
        {
            provide: BrandRepository,
            useClass: PrismaBrandRepository
        },
        {
            provide: ProductRepository,
            useClass: PrismaProductRepository
        },
        {
            provide: SkuRepository,
            useClass: PrismaSkuRepository
        },
        {
            provide: PricingRepository,
            useClass: PrismaPricingRepository
        },
        {
            provide: ResaleRepository,
            useClass: PrismaResaleRespository
        }
    ],
    exports: [
        AccountRepository,
        CustomersRepository,
        ProductCategoryRepository,
        ProductRepository,
        BrandRepository,
        SkuRepository,
        PricingRepository,
        ResaleRepository
    ]
})
export class DataBaseModule { }