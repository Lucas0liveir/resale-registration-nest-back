import { ProductCategory } from "@application/products-categories/entities/product-category";
import { Product } from "@application/products/entities/product";


export class ProductViewModel {

    static toHTTP(product: Product, productCategory: ProductCategory) {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            categoryId: product.categoryId,
            categoryName: productCategory.name
        }
    }
}