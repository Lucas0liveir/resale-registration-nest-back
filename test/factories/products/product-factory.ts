import { Product, ProductProps } from "@application/products/entities/product";
import { randomUUID } from "crypto";

type Override = Partial<ProductProps>

export function makeProduct(override: Override = {}, id?: string) {
    return new Product({
        name: "Produto 0",
        description: "teste teste",
        categoryId: randomUUID(),
        userId: randomUUID(),
        ...override
    }, id)
}