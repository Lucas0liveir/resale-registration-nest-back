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

@Module({
    imports: [DataBaseModule, AuthModule],
    controllers: [
        AccountsController,
        AuthController,
        CustomerController
    ],
    providers: [
        CreateResellerAccount,
        CreateCustomer,
        GetCustomersOfResellers
    ]
})
export class HttpModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(EnsureAdminMiddleware)
            .forRoutes({ path: "reseller/products_categories", method: RequestMethod.POST })
    }
}