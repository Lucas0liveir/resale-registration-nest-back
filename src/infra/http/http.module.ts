import { CreateResellerAccount } from "@application/accounts/use-cases/create-reseller-account";
import { AuthModule } from "./auth/auth.module";
import { DataBaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { AccountsController } from "./controllers/account.controller";
import { AuthController } from "./controllers/auth.controller";

@Module({
    imports: [DataBaseModule, AuthModule],
    controllers: [AccountsController, AuthController],
    providers: [
        CreateResellerAccount,
    ]
})
export class HttpModule { }