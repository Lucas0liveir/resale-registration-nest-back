import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../entities/User";
import * as bcrypt from 'bcrypt';
import { AccountRepository } from "../repositories/account-repository";

interface AccountRequest {
    name: string;
    email: string;
    password: string;
    role: 'USER' | 'ADMIN' | 'RESELLER'
}

interface AccountResponse {
    user: User
}

@Injectable()
export class CreateResellerAccount {

    constructor(
        private accountRepository: AccountRepository
    ) { }

    async execute(request: AccountRequest): Promise<AccountResponse> {
        const { email, name, password, role } = request

        const userExists = await this.accountRepository.findByEmail(email)

        if (userExists) {
            throw new NotFoundException(400, "Este endereço de email já foi cadastrado")
        }

        const user = new User({
            email,
            name,
            password: await bcrypt.hash(password, 10),
            role: role
        })

        await this.accountRepository.createReseller(user)

        return { user }
    }
}