import { makePricing } from "@test/factories/sku-pricing/pricing-factory"
import { makeSku } from "@test/factories/sku/sku-factory"
import { makeProduct } from "@test/factories/products/product-factory"
import { InMemoryPricingRepository } from "@test/repositories/sku-pricing/in-memory-sku-pricing"
import { InMemorySkuRepository } from "@test/repositories/sku/in-memory-sku-repository"
import { CreatePricing } from "./create-pricing"

describe("Create pricing", () => {

    it("Should be able to create a sku pricing", async () => {
        const pricingRepository = new InMemoryPricingRepository()
        const skuRepository = new InMemorySkuRepository()
        const createPricing = new CreatePricing(pricingRepository, skuRepository)

        const sku = makeSku({ product: makeProduct({ userId: "user-1" }) })
        const pricing = makePricing({ sku })

        await skuRepository.create(sku)

        const { pricing: newPricing } = await createPricing.execute({
            costPrice: pricing.costPrice,
            price: pricing.price,
            skuId: pricing.sku.id,
            userId: "user-1"
        })

        expect(pricingRepository.pricing).toHaveLength(1)
        expect(pricingRepository.pricing).toEqual(expect.arrayContaining([
            expect.objectContaining({ _id: newPricing.id })
        ]))
    })
})