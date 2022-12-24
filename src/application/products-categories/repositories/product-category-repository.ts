import { ProductCategory } from "../entities/product-category";

export abstract class ProductCategoryRepository {
    abstract createMany(productCategories: ProductCategory[]): Promise<void>;
    abstract create(productCategory: ProductCategory): Promise<void>;
    abstract findAll(userId: string): Promise<ProductCategory[] | null>;
    abstract findById(id: string): Promise<ProductCategory | null>;
    abstract save(productCategory: ProductCategory): Promise<void>;
    abstract delete(id: string, userId: string): Promise<void>
}