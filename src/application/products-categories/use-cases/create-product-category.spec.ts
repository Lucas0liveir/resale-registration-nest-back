import { InMemoryProductCategoriesRepository } from "@test/repositories/products-categories/in-memory-product-categories"
import { CreatProductCategories } from "./create-product-categories"

describe("Create product categories", () => {
    it("Should be able to create a many product categories", async () => {
        const productCategpryRepository = new InMemoryProductCategoriesRepository()
        const createProductCategory = new CreatProductCategories(productCategpryRepository)

        const names = ["teste1", "teste2", "teste3"]

        await createProductCategory.execute({ names })

        expect(productCategpryRepository.categories).toHaveLength(3)
    })
})