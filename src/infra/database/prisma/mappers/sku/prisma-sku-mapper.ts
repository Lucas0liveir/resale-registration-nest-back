import { Brand } from "@application/product-brand/entities/brand"
import { ProductCategory } from "@application/products-categories/entities/product-category"
import { Product } from "@application/products/entities/product"
import { Sku } from "@application/sku/entities/sku"
import { SKU as RawSKU, Product as RawProduct, Product_Category, Brand as RawBrand } from "@prisma/client"


export class PrismaSkuMapper {

    static toPrisma(sku: Sku) {
        return {
            id: sku.id,
            name: sku.name,
            especification: sku.especification,
            ean: sku.ean,
            product_id: sku.product.id,
            stock: sku.stock,
            min_stock: sku.minStock,
            weight: sku.weight,
            height: sku.height,
            width: sku.width,
            createdAt: sku.createdAt,
            updatedAt: sku.updatedAt
        }
    }

    static toDomain(rawSku: RawSKU & {
        product: RawProduct & {
            category: Product_Category,
            brand: RawBrand
        }
    }) {
        return new Sku({
            ean: rawSku.ean,
            especification: rawSku.especification,
            product: new Product({
                name: rawSku.product.name,
                description: rawSku.product.description,
                userId: rawSku.product.userId,
                createdAt: rawSku.product.createdAt,
                updatedAt: rawSku.product.updatedAt,
                categoryId: rawSku.product.category_id,
                brand: new Brand({
                    name: rawSku.product.brand.name,
                    userId: rawSku.product.brand.id,
                    createdAt: rawSku.product.brand.createdAt,
                    updatedAt: rawSku.product.brand.updatedAt
                }, rawSku.product.brand.id),
                category: new ProductCategory({
                    userId: rawSku.product.userId,
                    name: rawSku.product.category.name,
                    createdAt: rawSku.product.category.createdAt,
                    updatedAt: rawSku.product.category.updatedAt
                }, rawSku.product.category.id),
            }, rawSku.product.id),
            minStock: rawSku.min_stock,
            name: rawSku.name,
            stock: rawSku.stock,
            createdAt: rawSku.createdAt,
            updatedAt: rawSku.updatedAt,
            height: rawSku.height,
            weight: rawSku.weight,
            width: rawSku.width
        }, rawSku.id)
    }
}