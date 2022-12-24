import { Brand } from "@application/product-brand/entities/brand";

export class BrandViewModel {

    static toHTTP(brand: Brand) {
        return {
            id: brand.id,
            name: brand.name
        }
    }
}