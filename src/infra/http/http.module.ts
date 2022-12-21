import { CreateResellerAccount } from "@application/accounts/use-cases/create-reseller-account";
import { AuthModule } from "./auth/auth.module";
import { DataBaseModule } from "@infra/database/database.module";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AccountsController } from "./controllers/account.controller";
import { AuthController } from "./controllers/auth.controller";
import { GetCustomersOfResellers } from "@application/customers/use-cases/get-customers-of-resellers";
import { CreateCustomer } from "@application/customers/use-cases/create-customer";
import { CustomerController } from "./controllers/customer.controller";
import { EnsureAdminMiddleware } from "./middlewares/ensure-admin";
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

@Module({
    imports: [DataBaseModule, AuthModule],
    controllers: [
        AccountsController,
        AuthController,
        CustomerController,
        ProductCategoryController,
        ProductController
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
        GetUserProducts
    ]
})

export class HttpModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(EnsureAdminMiddleware)
            .forRoutes(
                { path: "reseller/products_categories", method: RequestMethod.POST },
                { path: "reseller/products_categories/:id", method: RequestMethod.DELETE },
                { path: "reseller/products_categories", method: RequestMethod.PUT }
            )
    }
}