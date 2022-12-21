import { BadRequestException } from "@nestjs/common";
import { makeProductCategory } from "@test/factories/products-categories/product-category-factory";
import { InMemoryProductCategoriesRepository } from "@test/repositories/products-categories/in-memory-product-categories";
import { UpdateProductCategory } from "./update-product-category";

describe("Update Product Category", () => {
    it("Should be able to update a product category", async () => {
        const productCategoryRepository = new InMemoryProductCategoriesRepository()
        const updateProductCategory = new UpdateProductCategory(productCategoryRepository)

        const category = makeProductCategory({ name: "category-1" })

        await productCategoryRepository.createMany([category])

        const updatedCategory = makeProductCategory({ name: "category-2" }, category.id)

        await updateProductCategory.execute({ category: updatedCategory })

        expect(productCategoryRepository.categories).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: "category-2" })
        ]))

    })

    it("Should not be able to update a non exists product category", async () => {
        const productCategoryRepository = new InMemoryProductCategoriesRepository()
        const updateProductCategory = new UpdateProductCategory(productCategoryRepository)

        const updatedCategory = makeProductCategory({ name: "category-2" })

        expect(async () => {
            await updateProductCategory.execute({ category: updatedCategory })
        }).rejects.toThrowError(BadRequestException)

    })
})