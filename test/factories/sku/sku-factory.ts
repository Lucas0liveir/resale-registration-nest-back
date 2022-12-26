import { Sku, SkuProps } from "@application/sku/entities/sku";
import { makeProduct } from "../products/product-factory";


type Override = Partial<SkuProps>

export function makeSku(override: Override = {}, id?: string) {
    return new Sku({
        ean: "78978978999",
        especification: "Sku A",
        minStock: 3,
        name: "Sku",
        product: makeProduct(),
        stock: 10,
        ...override
    }, id)
}