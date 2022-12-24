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
import { GetBrandsOfResellers } from "@application/product-brand/use-cases/get-customers-of-resellers";
import { CreateBrand } from "@application/product-brand/use-cases/create-brand";
import { BrandController } from "./controllers/brand.controller";

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
        BrandController
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
        CreateBrand
    ]
})

export class HttpModule { }