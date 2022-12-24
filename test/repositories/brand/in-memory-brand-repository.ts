import { Brand } from "@application/sku-brand/entities/brand"
import { BrandRepository } from "@application/sku-brand/repositories/brand-repository"


export class InMemoryBrandRepository extends BrandRepository {

    public brand: Brand[] = []

    async create(brand: Brand): Promise<void> {
        await this.brand.push(brand)
    }

    async findAllByUserId(userId: string): Promise<Brand[]> {
        return await this.brand.filter(item => item.userId === userId)
    }

    async findById(id: string): Promise<Brand> {
        return await this.brand.find(item => item.id === id)
    }

    async save(brand: Brand): Promise<void> {
        const customerIndex = await this.brand.findIndex(item => item.id === brand.id)

        if (customerIndex >= 0) {
            this.brand[customerIndex] = brand
        }
    }

}