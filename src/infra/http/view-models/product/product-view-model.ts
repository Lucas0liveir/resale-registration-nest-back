import { Product } from "@application/products/entities/product";

export class ProductViewModel {

    static toHTTP(product: Product) {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            categoryId: product.categoryId,
            brandName: product.brand.name,
            categoryName: product.category.name
        }
    }
}