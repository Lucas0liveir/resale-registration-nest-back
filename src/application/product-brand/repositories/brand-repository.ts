import { Brand } from "../entities/brand";

export abstract class BrandRepository {
    abstract create(brand: Brand): Promise<void>;
    abstract findAllByUserId(userId: string): Promise<Brand[] | null>;
    abstract findById(id: string, userId: string): Promise<Brand | null>;
    abstract save(brand: Brand): Promise<void>;
}