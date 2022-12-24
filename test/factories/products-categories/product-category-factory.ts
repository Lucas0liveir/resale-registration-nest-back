import { ProductCategory, ProductCategoryProps } from "@application/products-categories/entities/product-category";

type Override = Partial<ProductCategoryProps>

export function makeProductCategory(override: Override = {}, id?: string) {
    return new ProductCategory({
        name: "Lucas",
        userId: "user-1",
        ...override
    }, id)
}