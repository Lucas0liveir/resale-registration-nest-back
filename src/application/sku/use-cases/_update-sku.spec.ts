import { BadRequestException } from "@nestjs/common"
import { makeProduct } from "@test/factories/products/product-factory"
import { makeSku } from "@test/factories/sku/sku-factory"
import { InMemoryProductRepository } from "@test/repositories/products/in-memory-product-repository"
import { InMemorySkuRepository } from "@test/repositories/sku/in-memory-sku-repository"
import { UpdateSku } from "./update-sku"

describe("Update Sku", () => {
    it("Should be able to update a Sku", async () => {
        const skuRepository = new InMemorySkuRepository()
        const productRepository = new InMemoryProductRepository()
        const updateSku = new UpdateSku(skuRepository, productRepository)

        const product = makeProduct({ userId: "user-1" })

        await productRepository.create(product)

        const newSku = makeSku({ product, ean: "78978900" })
        await skuRepository.create(newSku)

        const editedSku = makeSku({ ean: "78978911" }, newSku.id)

        await updateSku.execute(
            {
                id: newSku.id,
                ean: editedSku.ean,
                especification: editedSku.especification,
                name: editedSku.name,
                minStock: editedSku.minStock,
                stock: editedSku.stock,
                userId: "user-1",
                productId: product.id
            }
        )

        expect(skuRepository.skus).toHaveLength(1)
        expect(skuRepository.skus).toEqual(expect.arrayContaining([
            expect.objectContaining({ ean: "78978911" })
        ]))
    })

    it("Should be able to update a Sku if it does not exists", async () => {
        const skuRepository = new InMemorySkuRepository()
        const productRepository = new InMemoryProductRepository()
        const updateSku = new UpdateSku(skuRepository, productRepository)

        const product = makeProduct({ userId: "user-1" })

        await productRepository.create(product)

        const newSku = makeSku({ product, ean: "78978900" })

        const editedSku = makeSku({ ean: "78978911" }, newSku.id)

        expect(async () => {
            await updateSku.execute(
                {
                    id: newSku.id,
                    ean: editedSku.ean,
                    especification: editedSku.especification,
                    name: editedSku.name,
                    minStock: editedSku.minStock,
                    stock: editedSku.stock,
                    userId: "user-1",
                    productId: product.id
                }
            )
        }).rejects.toThrowError(BadRequestException)
    })

    it("Should be able to update a Sku if product does not match a userId in request", async () => {
        const skuRepository = new InMemorySkuRepository()
        const productRepository = new InMemoryProductRepository()
        const updateSku = new UpdateSku(skuRepository, productRepository)

        const product = makeProduct({ userId: "user-1" })

        await productRepository.create(product)

        const newSku = makeSku({ product, ean: "78978900" })
        await skuRepository.create(newSku)

        const editedSku = makeSku({ ean: "78978911" }, newSku.id)

        expect(async () => {
            await updateSku.execute(
                {
                    id: newSku.id,
                    ean: editedSku.ean,
                    especification: editedSku.especification,
                    name: editedSku.name,
                    minStock: editedSku.minStock,
                    stock: editedSku.stock,
                    userId: "user-2",
                    productId: product.id
                }
            )
        }).rejects.toThrowError(BadRequestException)
    })
})