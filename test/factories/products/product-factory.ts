import { Brand } from "@application/product-brand/entities/brand";
import { ProductCategory } from "@application/products-categories/entities/product-category";
import { Product, ProductProps } from "@application/products/entities/product";
import { randomUUID } from "crypto";

type Override = Partial<ProductProps>

export function makeProduct(override: Override = {}, id?: string) {
    return new Product({
        name: "Produto 0",
        brand: new Brand({
            name: "brand-1",
            userId: "user-1",
        }),
        category: new ProductCategory({
            name: "category-1",
            userId: "user-1",
        }),
        description: "teste teste",
        categoryId: randomUUID(),
        userId: randomUUID(),
        ...override
    }, id)
}