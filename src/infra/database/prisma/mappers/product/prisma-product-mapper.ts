import { Brand } from "@application/product-brand/entities/brand"
import { ProductCategory } from "@application/products-categories/entities/product-category"
import { Product } from "@application/products/entities/product"
import { Product as RawProduct, Product_Category, Brand as PrismaBrand } from "@prisma/client"


export class PrismaProductMapper {

    static toPrisma(product: Product) {
        return {
            id: product.id,
            name: product.name,
            userId: product.userId,
            description: product.description,
            brand_id: product.brand.id,
            category_id: product.categoryId,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }
    }

    static toDomain(rawProduct: RawProduct & {
        category: Product_Category,
        brand: PrismaBrand
    }) {
        return new Product({
            name: rawProduct.name,
            brand: new Brand({
                name: rawProduct.brand.name,
                userId: rawProduct.brand.id,
                createdAt: rawProduct.brand.createdAt,
                updatedAt: rawProduct.brand.updatedAt
            }, rawProduct.brand.id),
            category: new ProductCategory({
                userId: rawProduct.userId,
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