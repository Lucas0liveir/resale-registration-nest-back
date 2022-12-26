import { Sku } from "@application/sku/entities/sku";

export class SkuViewModel {

    static toHTTP(sku: Sku) {
        return {
            id: sku.id,
            name: sku.name,
            especification: sku.especification,
            ean: sku.ean,
            productId: sku.product.id,
            productName: sku.product.name,
            stock: sku.stock,
            min_stock: sku.minStock,
            weight: sku.weight,
            height: sku.height,
            width: sku.width,
        }
    }
}