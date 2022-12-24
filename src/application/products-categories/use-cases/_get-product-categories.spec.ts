import { makeProductCategory } from "@test/factories/products-categories/product-category-factory"
import { InMemoryProductCategoriesRepository } from "@test/repositories/products-categories/in-memory-product-categories"
import { GetProductCategories } from "./get-product-categories"

describe("Get Product Categories", () => {
    it("Should be able to get all product categories", async () => {
        const productCategpryRepository = new InMemoryProductCategoriesRepository()
        const getProductCategory = new GetProductCategories(productCategpryRepository)

        const names = ["teste1", "teste2", "teste3"]
        const newCategories = names.map(name => makeProductCategory({ name, userId: "user-1", }))
        await productCategpryRepository.createMany(newCategories)

        const { categories } = await getProductCategory.execute({ userId: "user-1" })

        expect(categories).toHaveLength(3)
    })
})