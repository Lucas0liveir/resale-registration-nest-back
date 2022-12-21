import { ProductCategory } from "@application/products-categories/entities/product-category";

export class ProductCategoryViewModel {

    static toHTTP(productCategory: ProductCategory) {
        return {
            id: productCategory.id,
            name: productCategory.name
        }
    }

}