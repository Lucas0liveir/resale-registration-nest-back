import { Customer } from "@application/customers/entities/customer";
import { CustomersRepository } from "@application/customers/repositories/customer-repository";
import { CreateInstallments } from "@application/resale-installments/use-cases/create-installments";
import { ResaleSku } from "@application/resale-sku/entities/resale-sku";
import { CreateResaleSku } from "@application/resale-sku/use-cases/create-resale-sku";
import { PricingRepository } from "@application/sku-pricing/repositories/pricing-repository";
import { Sku } from "@application/sku/entities/sku";
import { SkuRepository } from "@application/sku/repositories/sku-repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Resale } from "../entities/resale";
import { ResaleRepository } from "../repositories/resale-repository";

interface CreateResaleRequest {
    resaleForm: {
        skuId: string;
        quantity: number;
    }[];
    paymentDates: string[];
    userId: string;
    customer: {
        id?: string;
        name?: string;
    }
}

interface CreateResaleResponse {
    resale: Resale
}

@Injectable()
export class CreateResale {

    constructor(
        private pricingRepository: PricingRepository,
        private customerRepository: CustomersRepository,
        private resaleRepository: ResaleRepository,
        private skuRepository: SkuRepository
    ) { }

    async execute(request: CreateResaleRequest): Promise<CreateResaleResponse> {
        let totalValue = 0
        const { customer, resaleForm, userId, paymentDates } = request

        let findCustomer = await this.customerRepository.findById(customer.id)

        if (!findCustomer || findCustomer.userId !== userId) {

            findCustomer = new Customer({
                name: customer.name,
                userId
            })

            await this.customerRepository.create(findCustomer)
        }

        const skuIds = resaleForm.map(item => item.skuId);
        const pricingPromises = skuIds.map(async skuId => await this.pricingRepository.findBySkuId(skuId));
        const pricingResults = await Promise.all(pricingPromises);

        for (let i = 0; i < pricingResults.length; i++) {
            const pricing = pricingResults[i];
            const resaleFormItem = resaleForm[i];
            if (!pricing || pricing?.sku?.product?.userId !== userId) {
                throw new BadRequestException("Acesso negado.")
            }

            totalValue += (pricing.price * resaleFormItem.quantity);
        }


        const resale = new Resale({
            customer: findCustomer,
            totalValue,
            userId
        })

        const createInstallments = new CreateInstallments()
        const createResaleSku = new CreateResaleSku(this.skuRepository)

        const { installments } = await createInstallments.execute({
            paymentDates,
            resaleId: resale.id,
            totalValue,
            userId
        })

        const { resaleSkus } = await createResaleSku.execute({
            resaleForm,
            resaleId: resale.id
        })

        resale.installments = installments
        resale.resaleSkus = resaleSkus

        await this.resaleRepository.create(resale)

        return { resale }
    }
}