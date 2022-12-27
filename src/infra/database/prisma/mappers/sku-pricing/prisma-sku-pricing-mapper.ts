import { Brand } from "@application/product-brand/entities/brand";
import { ProductCategory } from "@application/products-categories/entities/product-category";
import { Product } from "@application/products/entities/product";
import { Pricing } from "@application/sku-pricing/entities/pricing";
import { Sku } from "@application/sku/entities/sku";
import {
    Pricing as RawPricing,
    Product as RawProduct,
    Product_Category,
    SKU,
    Brand as RawBrand
} from "@prisma/client";

export class PrismaSkuPricingMapper {
    
    static toPrisma(pricing: Pricing) {
        return {
            id: pricing.id,
            sku_id: pricing.sku.id,
            cost_price: pricing.costPrice,
            price: pricing.price,
            createdAt: pricing.createdAt,
            updatedAt: pricing.updatedAt
        }
    }

    static toDomain(rawPricing: RawPricing & {
        sku: SKU & {
            product: RawProduct & {
                category: Product_Category,
                brand: RawBrand
            }
        }
    }) {
        return new Pricing({
            costPrice: Number(rawPricing.cost_price),
            price: Number(rawPricing.price),
            sku: new Sku({
                ean: rawPricing.sku.ean,
                especification: rawPricing.sku.especification,
                product: new Product({
                    name: rawPricing.sku.product.name,
                    description: rawPricing.sku.product.description,
                    userId: rawPricing.sku.product.userId,
                    createdAt: rawPricing.sku.product.createdAt,
                    updatedAt: rawPricing.sku.product.updatedAt,
                    categoryId: rawPricing.sku.product.category_id,
                    brand: new Brand({
                        name: rawPricing.sku.product.brand.name,
                        userId: rawPricing.sku.product.brand.id,
                        createdAt: rawPricing.sku.product.brand.createdAt,
                        updatedAt: rawPricing.sku.product.brand.updatedAt
                    }, rawPricing.sku.product.brand.id),
                    category: new ProductCategory({
                        userId: rawPricing.sku.product.userId,
                        name: rawPricing.sku.product.category.name,
                        createdAt: rawPricing.sku.product.category.createdAt,
                        updatedAt: rawPricing.sku.product.category.updatedAt
                    }, rawPricing.sku.product.category.id),
                }, rawPricing.sku.product.id),
                minStock: rawPricing.sku.min_stock,
                name: rawPricing.sku.name,
                stock: rawPricing.sku.stock,
                createdAt: rawPricing.sku.createdAt,
                updatedAt: rawPricing.sku.updatedAt,
                height: rawPricing.sku.height,
                weight: rawPricing.sku.weight,
                width: rawPricing.sku.width
            }, rawPricing.sku.id)
        }, rawPricing.id)
    }
}