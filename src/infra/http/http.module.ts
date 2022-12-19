import { CreateResellerAccount } from "@application/accounts/use-cases/create-reseller-account";
import { DataBaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { AccountsController } from "./controllers/account.controller";


@Module({
    imports: [DataBaseModule],
    controllers: [AccountsController],
    providers: [
        CreateResellerAccount
    ]
})
export class HttpModule { }