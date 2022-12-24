import { ProductCategory } from "@application/products-categories/entities/product-category";
import { Product_Category as RawProductCategory } from "@prisma/client";

export class PrismaProductCategoryMapper {
    
    static toPrisma(productCategory: ProductCategory) {
        return {
            id: productCategory.id,
            name: productCategory.name,
            userId: productCategory.userId,
            createdAt: productCategory.createdAt,
            updatedAt: productCategory.updatedAt
        }
    }

    static toDomain(rawProductCategory: RawProductCategory) {
        return new ProductCategory({
            userId: rawProductCategory.userId,
            name: rawProductCategory.name,
            createdAt: rawProductCategory.createdAt,
            updatedAt: rawProductCategory.createdAt
        }, rawProductCategory.id)
    }
}