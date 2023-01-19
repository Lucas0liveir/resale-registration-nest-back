import { Installment } from "@application/resale-installments/entities/installment";
import { Resale } from "@application/resale/entities/resale";
import { ResaleRepository } from "@application/resale/repositories/resale-repository";
import { Injectable } from "@nestjs/common";


@Injectable()
export class PrismaResaleRespository implements ResaleRepository {

    async create(resale: Resale, installments: Installment[]): Promise<void> {
        const rawResale  =''
    }

    async findById(resaleId: string): Promise<Resale> {
        throw new Error("Method not implemented.");
    }

    async findAllByUserId(userId: string): Promise<Resale[]> {
        throw new Error("Method not implemented.");
    }

    async save(resale: Resale): Promise<void> {
        throw new Error("Method not implemented.");
    }

}