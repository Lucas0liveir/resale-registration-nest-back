import { BadRequestException } from "@nestjs/common"
import { makeBrand } from "@test/factories/brand/brand-factory"
import { makeProductCategory } from "@test/factories/products-categories/product-category-factory"
import { makeProduct } from "@test/factories/products/product-factory"
import { InMemoryBrandRepository } from "@test/repositories/brand/in-memory-brand-repository"
import { InMemoryProductCategoriesRepository } from "@test/repositories/products-categories/in-memory-product-categories"
import { InMemoryProductRepository } from "@test/repositories/products/in-memory-product-repository"
import { EditProduct } from "./edit-product"

describe("Edit product", () => {
    it("should be able to edit a product", async () => {
        const productRepository = new InMemoryProductRepository()
        const productCategoryRepository = new InMemoryProductCategoriesRepository()
        const brandRepository = new InMemoryBrandRepository()
        const editProduct = new EditProduct(productCategoryRepository, productRepository, brandRepository)

        const brand = makeBrand({ userId: "user-1" })
        const category = makeProductCategory({ userId: "user-1" })

        await productCategoryRepository.createMany([category])
        await brandRepository.create(brand)

        const product = makeProduct({ userId: "user-1", name: "produto A", brand, category, categoryId: category.id })

        await productRepository.create(product)

        const editedProduct = makeProduct({ userId: "user-1", name: "produto B", brand, category, categoryId: category.id }, product.id)

        await editProduct.execute({
            id: editedProduct.id,
            brandId: editedProduct.brand.id,
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
        const productCategoryRepository = new InMemoryProductCategoriesRepository()
        const brandRepository = new InMemoryBrandRepository()
        const editProduct = new EditProduct(productCategoryRepository, productRepository, brandRepository)

        const brand = makeBrand({ userId: "user-1" })
        const category = makeProductCategory({ userId: "user-1" })

        await productCategoryRepository.createMany([category])
        await brandRepository.create(brand)

        const editedProduct = makeProduct({ name: "produto B", brand, category, categoryId: category.id })

        expect(async () => {
            await editProduct.execute({
                id: editedProduct.id,
                brandId: editedProduct.brand.id,
                categoryId: editedProduct.categoryId,
                name: editedProduct.name,
                description: editedProduct.description,
                userId: editedProduct.userId
            })
        }).rejects.toThrowError(BadRequestException)

    })
})