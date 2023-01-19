import { CreateResellerAccount } from "@application/accounts/use-cases/create-reseller-account";
import { AuthModule } from "./auth/auth.module";
import { DataBaseModule } from "@infra/database/database.module";
import { CacheModule, Module } from "@nestjs/common";
import { AccountsController } from "./controllers/account.controller";
import { AuthController } from "./controllers/auth.controller";
import { GetCustomersOfResellers } from "@application/customers/use-cases/get-customers-of-resellers";
import { CreateCustomer } from "@application/customers/use-cases/create-customer";
import { CustomerController } from "./controllers/customer.controller";
import { DeleteProductCategory } from "@application/products-categories/use-cases/delete-product-category";
import { CreatProductCategories } from "@application/products-categories/use-cases/create-product-categories";
import { GetProductCategories } from "@application/products-categories/use-cases/get-product-categories";
import { UpdateProductCategory } from "@application/products-categories/use-cases/update-product-category";
import { ProductCategoryController } from "./controllers/product-category.controller";
import { CreateProduct } from "@application/products/use-cases/create-product";
import { DeleteUserProduct } from "@application/products/use-cases/delete-user-product";
import { EditProduct } from "@application/products/use-cases/edit-product";
import { GetUserProducts } from "@application/products/use-cases/get-user-products";
import { GetProductCategory } from "@application/products-categories/use-cases/get-product-category";
import { ProductController } from "./controllers/product.controller";
import { CreateBrand } from "@application/product-brand/use-cases/create-brand";
import { BrandController } from "./controllers/brand.controller";
import { SkuController } from "./controllers/sku.controller";
import { GetBrandsOfResellers } from "@application/product-brand/use-cases/get-brands-of-resellers";
import { CreateSku } from "@application/sku/use-cases/create-sku";
import { GetProductSkus } from "@application/sku/use-cases/get-product-skus";
import { UpdateSku } from "@application/sku/use-cases/update-sku";
import { CreatePricing } from "@application/sku-pricing/use-cases/create-pricing";
import { GetSkuPricing } from "@application/sku-pricing/use-cases/get-sku-pricing";
import { UpdatePricing } from "@application/sku-pricing/use-cases/update-pricing";
import { PricingController } from "./controllers/sku-pricing.controller";
import { CreateResale } from "@application/resale/use-cases/create-resale";
import { FindResale } from "@application/resale/use-cases/find-resale";
import { ResaleController } from "./controllers/resale.controller";

@Module({
    imports: [DataBaseModule, AuthModule, CacheModule.register({
        ttl: 20
    })],
    controllers: [
        AccountsController,
        AuthController,
        CustomerController,
        ProductCategoryController,
        ProductController,
        SkuController,
        BrandController,
        PricingController,
        ResaleController
    ],
    providers: [
        CreateResellerAccount,
        CreateCustomer,
        GetCustomersOfResellers,
        DeleteProductCategory,
        CreatProductCategories,
        GetProductCategories,
        GetProductCategory,
        UpdateProductCategory,
        CreateProduct,
        DeleteUserProduct,
        EditProduct,
        GetUserProducts,
        GetBrandsOfResellers,
        CreateBrand,
        CreateSku,
        GetProductSkus,
        UpdateSku,
        CreatePricing,
        GetSkuPricing,
        UpdatePricing,
        CreateResale,
        FindResale
    ]
})

export class HttpModule { }