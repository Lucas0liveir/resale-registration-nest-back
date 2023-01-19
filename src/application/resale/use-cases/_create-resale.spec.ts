import { makeCustomer } from "@test/factories/customer/customer-factory"
import { makeProduct } from "@test/factories/products/product-factory"
import { makePricing } from "@test/factories/sku-pricing/pricing-factory"
import { makeSku } from "@test/factories/sku/sku-factory"
import { InMemoryCustomersRepository } from "@test/repositories/customers/in-memory-customers"
import { InMemoryResaleRepository } from "@test/repositories/resale/in-memory-resale-repository"
import { InMemoryPricingRepository } from "@test/repositories/sku-pricing/in-memory-sku-pricing"
import { InMemorySkuRepository } from "@test/repositories/sku/in-memory-sku-repository"
import { CreateResale } from "./create-resale"

describe("Create a resale", () => {
    it("Should be able to create new resale", async () => {

        const pricingRepository = new InMemoryPricingRepository()
        const customerRepository = new InMemoryCustomersRepository()
        const resaleRepository = new InMemoryResaleRepository()
        const skuRepository = new InMemorySkuRepository()
        const createResale = new CreateResale(pricingRepository, customerRepository, resaleRepository, skuRepository)

        const customer = makeCustomer({ userId: "user-1" })
        await customerRepository.create(customer)

        const product = makeProduct({ userId: "user-1" })
        const sku = makeSku({ product })
        await skuRepository.create(sku)

        const pricing = makePricing({ sku, price: 250 })
        await pricingRepository.create(pricing)

        await createResale.execute({
            customer: {
                id: customer.id,
            },
            paymentDates: [new Date().toISOString().substring(0, 10)],
            resaleForm: [{
                quantity: 2,
                skuId: sku.id
            }],
            userId: "user-1"
        })

        expect(resaleRepository.resales).toHaveLength(1)
        expect(resaleRepository.resales).toEqual(expect.arrayContaining([
            expect.objectContaining({ props: expect.objectContaining({ totalValue: 500 }) })
        ]))

    })
})