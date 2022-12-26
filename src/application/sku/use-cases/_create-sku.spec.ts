import { BadRequestException } from "@nestjs/common"
import { makeProduct } from "@test/factories/products/product-factory"
import { makeSku } from "@test/factories/sku/sku-factory"
import { InMemoryProductRepository } from "@test/repositories/products/in-memory-product-repository"
import { InMemorySkuRepository } from "@test/repositories/sku/in-memory-sku-repository"
import { CreateSku } from "./create-sku"

describe("Create Sku", () => {
    it("Should be able to create a new Sku", async () => {
        const skuRepository = new InMemorySkuRepository()
        const productRepository = new InMemoryProductRepository()
        const createSku = new CreateSku(skuRepository, productRepository)

        const product = makeProduct({ userId: "user-1" })

        await productRepository.create(product)

        const newSku = makeSku({ product })

        const { sku } = await createSku.execute(
            {
                ean: newSku.ean,
                especification: newSku.especification,
                name: newSku.name,
                minStock: newSku.minStock,
                stock: newSku.stock,
                userId: "user-1",
                productId: product.id
            }
        )

        expect(skuRepository.skus).toHaveLength(1)
        expect(skuRepository.skus).toEqual(expect.arrayContaining([
            expect.objectContaining(sku)
        ]))
    })

    it("Should not be able to create a new Sku if product does not match a userId in request", async () => {
        const skuRepository = new InMemorySkuRepository()
        const productRepository = new InMemoryProductRepository()
        const createSku = new CreateSku(skuRepository, productRepository)

        const product = makeProduct({ userId: "user-1" })

        await productRepository.create(product)

        const newSku = makeSku({ product })


        expect(async () => {
            await createSku.execute(
                {
                    ean: newSku.ean,
                    especification: newSku.especification,
                    name: newSku.name,
                    minStock: newSku.minStock,
                    stock: newSku.stock,
                    userId: "user-2",
                    productId: product.id
                }
            )
        }).rejects.toThrowError(BadRequestException)

    })


})