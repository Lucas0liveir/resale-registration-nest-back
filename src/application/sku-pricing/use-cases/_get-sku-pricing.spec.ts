import { makePricing } from "@test/factories/sku-pricing/pricing-factory";
import { makeSku } from "@test/factories/sku/sku-factory";
import { makeProduct } from "@test/factories/products/product-factory";
import { InMemoryPricingRepository } from "@test/repositories/sku-pricing/in-memory-sku-pricing";
import { InMemorySkuRepository } from "@test/repositories/sku/in-memory-sku-repository";
import { GetSkuPricing } from "./get-sku-pricing";
import { BadRequestException } from "@nestjs/common";

describe("Get sku pricing", () => {
    it("Should be able to find a sku pricing", async () => {
        const pricingRepository = new InMemoryPricingRepository()
        const skuRepository = new InMemorySkuRepository()
        const getSkuPricing = new GetSkuPricing(skuRepository, pricingRepository)

        const sku = makeSku({ product: makeProduct({ userId: "user-1" }) })
        const pricing = makePricing({ sku })

        await skuRepository.create(sku)

        await pricingRepository.create(pricing)

        const { pricing: skuPricing } = await getSkuPricing.execute({ skuId: sku.id, userId: "user-1" })

        expect(skuPricing).toEqual(expect.objectContaining({ _id: pricing.id }))

    })

    it("Should not be able to find a sku pricing if userId does not match", async () => {
        const pricingRepository = new InMemoryPricingRepository()
        const skuRepository = new InMemorySkuRepository()
        const getSkuPricing = new GetSkuPricing(skuRepository, pricingRepository)

        const sku = makeSku({ product: makeProduct({ userId: "user-1" }) })
        const pricing = makePricing({ sku })

        await skuRepository.create(sku)

        await pricingRepository.create(pricing)

        expect(async () => {
            await getSkuPricing.execute({ skuId: sku.id, userId: "user-2" })
        }).rejects.toThrowError(BadRequestException)

    })
})