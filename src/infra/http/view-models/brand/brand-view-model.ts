import { Brand } from "@application/sku-brand/entities/brand";

export class BrandViewModel {

    static toHTTP(brand: Brand) {
        return {
            id: brand.id,
            name: brand.name
        }
    }
}