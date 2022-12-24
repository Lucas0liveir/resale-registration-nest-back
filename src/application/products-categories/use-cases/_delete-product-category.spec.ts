import { BadRequestException } from "@nestjs/common"
import { makeProductCategory } from "@test/factories/products-categories/product-category-factory"
import { InMemoryProductCategoriesRepository } from "@test/repositories/products-categories/in-memory-product-categories"
import { rejects } from "assert"
import { DeleteProductCategory } from "./delete-product-category"

describe("Delete a product category", () => {
    it("Should be able to delete a product category", async () => {
        const productCategoryRepository = new InMemoryProductCategoriesRepository()
        const deleteProductCategory = new DeleteProductCategory(productCategoryRepository)

        const category = makeProductCategory({ name: "test-1" })
        const category2 = makeProductCategory()

        productCategoryRepository.createMany([category, category2])

        await deleteProductCategory.execute({ id: category.id, userId: "user-1" })

        expect(productCategoryRepository.categories).toHaveLength(1)
        expect(productCategoryRepository.categories).not.toEqual(expect.arrayContaining([
            expect.objectContaining({ name: "test-1" })
        ]))
    })

    it("Should not be able to delete a non exists product category", async () => {
        const productCategoryRepository = new InMemoryProductCategoriesRepository()
        const deleteProductCategory = new DeleteProductCategory(productCategoryRepository)

        expect(async () => {
            await deleteProductCategory.execute({ id: 'test-1', userId: "user-1" })
        }).rejects.toThrowError(BadRequestException)
    })
})