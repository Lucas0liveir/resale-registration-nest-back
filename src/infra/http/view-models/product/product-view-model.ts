import { Product } from "@application/products/entities/product";

export class ProductViewModel {

    static toHTTP(product: Product) {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            categoryId: product.categoryId,
            categoryName: product.category.name
        }
    }
}