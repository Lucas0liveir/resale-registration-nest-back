import { makeProduct } from "@test/factories/products/product-factory"
import { makeSku } from "@test/factories/sku/sku-factory"
import { InMemoryProductRepository } from "@test/repositories/products/in-memory-product-repository"
import { InMemorySkuRepository } from "@test/repositories/sku/in-memory-sku-repository"
import { GetProductSkus } from "./get-product-skus"

describe("Get SKUs", () => {
    it("Should be able to get all product skus", async () => {
        const skuRepository = new InMemorySkuRepository()
        const productRepository = new InMemoryProductRepository()
        const getProductSkus = new GetProductSkus(skuRepository, productRepository)

        const product1 = makeProduct({ userId: "user-1" })
        const product2 = makeProduct({ userId: "user-2" })

        const sku1 = makeSku({ product: product1 })
        const sku2 = makeSku({ product: product1 })
        const sku3 = makeSku({ product: product2 })

        await productRepository.create(product1)
        await productRepository.create(product2)

        await skuRepository.create(sku1)
        await skuRepository.create(sku2)
        await skuRepository.create(sku3)

        const { skus } = await getProductSkus.execute({ productId: product1.id, userId: "user-1" })

        expect(skus).toHaveLength(2)
    })
})