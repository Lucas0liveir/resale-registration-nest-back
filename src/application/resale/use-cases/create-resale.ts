import { CustomersRepository } from "@application/customers/repositories/customer-repository";
import { PricingRepository } from "@application/sku-pricing/repositories/pricing-repository";
import { BadRequestException, Injectable, Res } from "@nestjs/common";
import { Resale } from "../entities/resale";
import { ResaleRepository } from "../repositories/resale-repository";

interface CreateResaleRequest {
    resaleForm: {
        skuId: string;
        quantity: number;
    }[];
    userId: string;
    customerId: string;
}

interface CreateResaleResponse {
    resale: Resale
}

@Injectable()
export class CreateResale {

    constructor(
        private pricingRepository: PricingRepository,
        private customerRepository: CustomersRepository,
        private resaleRepository: ResaleRepository
    ) { }

    async execute(request: CreateResaleRequest): Promise<CreateResaleResponse> {
        const { customerId, resaleForm, userId } = request

        const customer = await this.customerRepository.findById(customerId)

        if (!customer || customer.userId !== userId) {
            throw new BadRequestException("Acesso negado.")
        }

        let totalValue = 0
        for await (let item of resaleForm) {
            const pricing = await this.pricingRepository.findBySkuId(item.skuId)

            if (!pricing || pricing?.sku?.product?.userId !== userId) {
                throw new BadRequestException("Acesso negado.")
            }

            totalValue += (pricing.price * item.quantity)
        }

        const resale = new Resale({
            customer,
            totalValue,
            userId
        })

        await this.resaleRepository.create(resale)

        return { resale }
    }
}