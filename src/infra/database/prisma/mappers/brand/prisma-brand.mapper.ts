import { Customer } from "@application/customers/entities/customer";
import { Brand } from "@application/product-brand/entities/brand";
import { Brand as RawBrand } from "@prisma/client";

export class PrismaBrandMapper {
    static toPrisma(brand: Brand) {
        return {
            id: brand.id,
            name: brand.name,
            userId: brand.userId,
            createdAt: brand.createdAt,
            updatedAt: brand.updatedAt
        }
    }

    static toDomain(RawBrand: RawBrand) {
        return new Brand({
            name: RawBrand.name,
            userId: RawBrand.userId,
            createdAt: RawBrand.createdAt,
            updatedAt: RawBrand.createdAt
        }, RawBrand.id)
    }
}