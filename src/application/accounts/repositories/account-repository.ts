import { User } from "../entities/User";

export abstract class AccountRepository {
    abstract createReseller(user: User): void;
    abstract create(user: User): void;
    abstract createRefreshToken(userId: string, token: string): void;
    abstract updateRefreshToken(userId: string, token: string): void;
    abstract findRefreshTokenByUserId(userId: string): Promise<string>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findById(id: string): Promise<User | null>;
    abstract save(user: User): Promise<User | null>;
}