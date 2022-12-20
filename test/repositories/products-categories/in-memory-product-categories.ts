import { ProductCategory } from "@application/products-categories/entities/product-category";
import { ProductCategoryRepository } from "@application/products-categories/repositories/product-category-repository";

export class InMemoryProductCategoriesRepository extends ProductCategoryRepository {

    public categories: ProductCategory[] = []

    async createMany(productCategories: ProductCategory[]): Promise<void> {
        await this.categories.push(...productCategories)
    }

    async findAll(): Promise<ProductCategory[]> {
        return await this.categories
    }

    async save(productCategory: ProductCategory): Promise<void> {

        const productCategoryIndex = this.categories.findIndex(item => item.id === productCategory.id)

        if (productCategoryIndex >= 0) {
            this.categories[productCategoryIndex] = productCategory
        }

    }

    async delete(id: string): Promise<void> {
        const productCategoryIndex = this.categories.findIndex(item => item.id === id)

        if (productCategoryIndex >= 0) {
            this.categories.splice(productCategoryIndex, 1)
        }
    }

}