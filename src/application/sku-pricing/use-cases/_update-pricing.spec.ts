import { makePricing } from "@test/factories/sku-pricing/pricing-factory"
import { makeSku } from "@test/factories/sku/sku-factory"
import { makeProduct } from "@test/factories/products/product-factory"
import { InMemoryPricingRepository } from "@test/repositories/sku-pricing/in-memory-sku-pricing"
import { InMemorySkuRepository } from "@test/repositories/sku/in-memory-sku-repository"
import { UpdatePricing } from "./update-pricing"
import { BadRequestException } from "@nestjs/common"

describe("Update pricing", () => {

    it("Should be able to update a sku pricing", async () => {
        const pricingRepository = new InMemoryPricingRepository()
        const skuRepository = new InMemorySkuRepository()
        const updatePricing = new UpdatePricing(pricingRepository, skuRepository)

        const sku = makeSku({ product: makeProduct({ userId: "user-1" }) })
        const pricing = makePricing({ sku, costPrice: 10.40, price: 28.52 })

        await pricingRepository.create(pricing)
        await skuRepository.create(sku)

        const editedPricing = makePricing({ sku, costPrice: 20.40, price: 40.52 }, pricing.id)

        await updatePricing.execute({
            costPrice: editedPricing.costPrice,
            price: editedPricing.price,
            skuId: sku.id,
            userId: "user-1",
            id: pricing.id
        })

        expect(pricingRepository.pricing).toEqual(expect.arrayContaining([
            expect.objectContaining({ props: expect.objectContaining({ costPrice: 20.40, price: 40.52 }) })
        ]))
    })

    it("Should not be able to update a sku pricing if skuId does not match", async () => {
        const pricingRepository = new InMemoryPricingRepository()
        const skuRepository = new InMemorySkuRepository()
        const updatePricing = new UpdatePricing(pricingRepository, skuRepository)

        const sku = makeSku({ product: makeProduct({ userId: "user-1" }) })
        const pricing = makePricing({ sku, costPrice: 10.40, price: 28.52 })

        await pricingRepository.create(pricing)
        await skuRepository.create(sku)

        const editedPricing = makePricing({ sku, costPrice: 20.40, price: 40.52 }, pricing.id)

        expect(async () => {
            await updatePricing.execute({
                costPrice: editedPricing.costPrice,
                price: editedPricing.price,
                skuId: "sku-id-not-match",
                userId: "user-1",
                id: pricing.id
            })
        }).rejects.toThrowError(BadRequestException)
    })

    it("Should not be able to update a sku pricing if userId does not match", async () => {
        const pricingRepository = new InMemoryPricingRepository()
        const skuRepository = new InMemorySkuRepository()
        const updatePricing = new UpdatePricing(pricingRepository, skuRepository)

        const sku = makeSku({ product: makeProduct({ userId: "user-1" }) })
        const pricing = makePricing({ sku, costPrice: 10.40, price: 28.52 })

        await pricingRepository.create(pricing)
        await skuRepository.create(sku)

        const editedPricing = makePricing({ sku, costPrice: 20.40, price: 40.52 }, pricing.id)

        expect(async () => {
            await updatePricing.execute({
                costPrice: editedPricing.costPrice,
                price: editedPricing.price,
                skuId: sku.id,
                userId: "user-2",
                id: pricing.id
            })
        }).rejects.toThrowError(BadRequestException)
    })
})