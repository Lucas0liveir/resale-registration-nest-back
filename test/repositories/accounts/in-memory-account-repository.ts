import { User } from "@application/accounts/entities/User";
import { AccountRepository } from "@application/accounts/repositories/account-repository";


export class InMemoryAccountRepository extends AccountRepository {
    
    createRefreshToken(userId: string, token: string): void {
        throw new Error("Method not implemented.");
    }
    updateRefreshToken(userId: string, token: string): void {
        throw new Error("Method not implemented.");
    }
    findRefreshTokenByUserId(userId: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

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