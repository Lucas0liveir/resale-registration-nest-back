import { makeProduct } from "@test/factories/products/product-factory"
import { InMemoryProductRepository } from "@test/repositories/products/in-memory-product-repository"
import { GetUserProducts } from "./get-user-products"

describe("Get user products", () => {
    it("should be able to get user products", async () => {
        const productRepository = new InMemoryProductRepository()
        const getUserProducts = new GetUserProducts(productRepository)

        const product1 = makeProduct({ userId: "user-1" })
        const product2 = makeProduct({ userId: "user-1" })
        const product3 = makeProduct({ userId: "user-2" })

        await productRepository.create(product1)
        await productRepository.create(product2)
        await productRepository.create(product3)

        const { products } = await getUserProducts.execute({ userId: "user-1" })

        expect(products).toHaveLength(2)
        expect(products).toEqual(expect.arrayContaining([
            expect.objectContaining({ userId: "user-1" })
        ]))
    })
})