import { User } from "@application/accounts/entities/User";
import { AccountRepository } from "@application/accounts/repositories/account-repository";


export class InMemoryAccountRepository extends AccountRepository {

    public user: User[] = []

    async createReseller(user: User) {
        await this.user.push(user)
    }

    create(user: User) {
        throw new Error("Method not implemented.");
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.user.find(user => user.email === email)
    }

    findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    save(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

}