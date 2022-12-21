import { BadRequestException } from "@nestjs/common"
import { makeProduct } from "@test/factories/products/product-factory"
import { InMemoryProductRepository } from "@test/repositories/products/in-memory-product-repository"
import { DeleteUserProduct } from "./delete-user-product"

describe("Delete user product", () => {
    it("Should be able to delete a user product", async () => {
        const productRepository = new InMemoryProductRepository()
        const deleteUserProduct = new DeleteUserProduct(productRepository)

        const product = makeProduct({ name: "batata" })
        const product2 = makeProduct({ name: "batata Rocha" })

        productRepository.create(product)
        productRepository.create(product2)

        await deleteUserProduct.execute({ productId: product.id, userId: product.userId })

        expect(productRepository.products).not.toEqual(expect.arrayContaining([
            expect.objectContaining({ name: "batata" })
        ]))
    })

    it("Should not be able to delete a non exists user product", async () => {
        const productRepository = new InMemoryProductRepository()
        const deleteUserProduct = new DeleteUserProduct(productRepository)

        const product = makeProduct({ name: "batata" })

        expect(async () => {
            await deleteUserProduct.execute({ productId: product.id, userId: product.userId })
        }).rejects.toThrowError(BadRequestException)
    })
})