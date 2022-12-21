import { Product } from "../entities/product";

export abstract class ProductRepository {
    abstract create(product: Product): Promise<void>;
    abstract findAllByUserId(userId: string): Promise<Product[]>;
    abstract findById(id: string, userId: string): Promise<Product>;
    abstract deleteByUserId(userId: string, productId: string): Promise<void>;
    abstract save(product: Product): Promise<void>;
}