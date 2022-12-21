import { Product } from "@application/products/entities/product"
import { Product as RawProduct } from "@prisma/client"


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

    static toDomain(rawProduct: RawProduct) {
        return new Product({
            name: rawProduct.name,
            categoryId: rawProduct.category_id,
            userId: rawProduct.userId,
            description: rawProduct.description,
            createdAt: rawProduct.createdAt,
            updatedAt: rawProduct.createdAt
        }, rawProduct.id)
    }
}