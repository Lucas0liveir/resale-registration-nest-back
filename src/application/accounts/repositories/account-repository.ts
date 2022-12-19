import { User } from "../entities/User";

export abstract class AccountRepository {
    abstract createReseller(user: User): void;
    abstract create(user: User): void;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findById(id: string): Promise<User | null>;
    abstract save(user: User): Promise<User | null>;
}