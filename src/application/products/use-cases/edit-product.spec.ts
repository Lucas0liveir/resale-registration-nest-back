import { BadRequestException } from "@nestjs/common"
import { makeProduct } from "@test/factories/products/product-factory"
import { InMemoryProductRepository } from "@test/repositories/products/in-memory-product-repository"
import { EditProduct } from "./edit-product"

describe("Edit product", () => {
    it("should be able to edit a product", async () => {
        const productRepository = new InMemoryProductRepository()
        const editProduct = new EditProduct(productRepository)

        const product = makeProduct({ name: "produto A" })

        await productRepository.create(product)

        const editedProduct = makeProduct({ name: "produto B" }, product.id)

        await editProduct.execute({
            id: editedProduct.id,
            categoryId: editedProduct.categoryId,
            name: editedProduct.name,
            description: editedProduct.description,
            userId: editedProduct.userId
        })

        expect(productRepository.products).toHaveLength(1)
        expect(productRepository.products).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: "produto B" })
        ]))

    })

    it("should not be able to edit a non exists product", async () => {
        const productRepository = new InMemoryProductRepository()
        const editProduct = new EditProduct(productRepository)

        const editedProduct = makeProduct({ name: "produto B" })

        expect(async () => {
            await editProduct.execute({
                id: editedProduct.id,
                categoryId: editedProduct.categoryId,
                name: editedProduct.name,
                description: editedProduct.description,
                userId: editedProduct.userId
            })
        }).rejects.toThrowError(BadRequestException)

    })
})