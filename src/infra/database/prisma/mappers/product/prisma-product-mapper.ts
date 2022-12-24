import { ProductCategory } from "@application/products-categories/entities/product-category"
import { Product } from "@application/products/entities/product"
import { Product as RawProduct, Product_Category } from "@prisma/client"


export class PrismaProductMapper {

    static toPrisma(product: Product) {
        return {
            id: product.id,
            name: product.name,
            userId: product.userId,
            description: product.description,
            category_id: product.categoryId,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }
    }

    static toDomain(rawProduct: RawProduct & {
        category: Product_Category;
    }) {
        return new Product({
            name: rawProduct.name,
            category: new ProductCategory({
                name: rawProduct.category.name,
                createdAt: rawProduct.category.createdAt,
                updatedAt: rawProduct.category.updatedAt
            }, rawProduct.category.id),
            categoryId: rawProduct.category_id,
            userId: rawProduct.userId,
            description: rawProduct.description,
            createdAt: rawProduct.createdAt,
            updatedAt: rawProduct.createdAt
        }, rawProduct.id)
    }
}