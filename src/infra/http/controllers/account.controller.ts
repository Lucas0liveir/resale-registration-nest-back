import { CreateResellerAccount } from "@application/accounts/use-cases/create-reseller-account";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateAccountBody } from "../dtos/create-account-reseller-body";
import { AccoutViewModel } from "../view-models/account-view-model";


@Controller('accounts')
export class AccountsController {
    constructor(
        private createResallerAccount: CreateResellerAccount
    ) { }

    @Post('reseller')
    async createReseller(@Body() body: CreateAccountBody) {
        const { email, name, password } = body

        const { user } = await this.createResallerAccount.execute({
            email,
            name,
            password,
            role: "RESELLER"
        })

        return { user: AccoutViewModel.toHTTP(user) }
    }

}