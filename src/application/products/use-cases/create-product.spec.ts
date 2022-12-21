import { makeProduct } from "@test/factories/products/product-factory"
import { InMemoryProductRepository } from "@test/repositories/products/in-memory-product-repository"
import { CreateProduct } from "./create-product"

describe("Create product", () => {
    it("Should be able to create a new product", async () => {
        const productRepository = new InMemoryProductRepository()
        const createProduct = new CreateProduct(productRepository)

        const product = makeProduct({ name: "produto 1" })

        await createProduct.execute(product)

        expect(productRepository.products).toHaveLength(1)
        expect(productRepository.products).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: "produto 1" })
        ]))
    })
})