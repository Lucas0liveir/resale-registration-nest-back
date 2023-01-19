import { Installment } from "@application/resale-installments/entities/installment";
import { ResaleSku } from "@application/resale-sku/entities/resale-sku";
import { Resale } from "@application/resale/entities/resale";
import { ResaleRepository } from "@application/resale/repositories/resale-repository";
import { BadRequestException } from "@nestjs/common";

export class InMemoryResaleRepository extends ResaleRepository {

    public resales: Resale[] = []

    async create(resale: Resale): Promise<void> {
        this.resales.push(resale)
    }

    async findById(resaleId: string): Promise<Resale> {
        return this.resales.find(item => item.id === resaleId)
    }

    async findAllByUserId(userId: string): Promise<Resale[]> {
        return this.resales.filter(item => item.userId === userId)
    }

    async save(resale: Resale): Promise<void> {
        const index = this.resales.findIndex(item => item.id === resale.id)

        if (index >= 0) {
            this.resales[index] = resale
        } else {
            throw new BadRequestException("Revenda inexistente")
        }
    }

}