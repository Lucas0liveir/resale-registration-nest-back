import { Sku } from "@application/sku/entities/sku";
import { SkuRepository } from "@application/sku/repositories/sku-repository";
import { BadRequestException } from "@nestjs/common";

export class InMemorySkuRepository extends SkuRepository {

    public skus: Sku[] = []

    async create(sku: Sku): Promise<void> {
        this.skus.push(sku)
    }

    async findById(id: string): Promise<Sku> {
        return this.skus.find(item => item.id === id)
    }

    async findAllByProductId(productId: string): Promise<Sku[]> {
        return this.skus.filter(item => item.product.id === productId)
    }

    async save(sku: Sku): Promise<void> {
        const skuIndex = this.skus.findIndex(item => item.id === sku.id)

        if (skuIndex >= 0) {
            this.skus[skuIndex] = sku
        } else {
            throw new BadRequestException("Sku não existe")
        }
    }

}