import { Sku } from "../entities/sku";

export abstract class SkuRepository {
    abstract create(sku: Sku): Promise<void>;
    abstract findAllByProductId(productId: string): Promise<Sku[]>;
    abstract save(sku: Sku): Promise<void>;
}