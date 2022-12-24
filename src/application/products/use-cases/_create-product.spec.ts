import { makeBrand } from "@test/factories/brand/brand-factory"
import { makeProductCategory } from "@test/factories/products-categories/product-category-factory"
import { makeProduct } from "@test/factories/products/product-factory"
import { InMemoryBrandRepository } from "@test/repositories/brand/in-memory-brand-repository"
import { InMemoryProductCategoriesRepository } from "@test/repositories/products-categories/in-memory-product-categories"
import { InMemoryProductRepository } from "@test/repositories/products/in-memory-product-repository"
import { CreateProduct } from "./create-product"

describe("Create product", () => {
    it("Should be able to create a new product", async () => {
        const productRepository = new InMemoryProductRepository()
        const productCategoryRepository = new InMemoryProductCategoriesRepository()
        const brandRepository = new InMemoryBrandRepository()
        const createProduct = new CreateProduct(productCategoryRepository, productRepository, brandRepository)

        const brand = makeBrand({ userId: "user-1" })
        const category = makeProductCategory({ userId: "user-1" })

        await productCategoryRepository.createMany([category])
        await brandRepository.create(brand)

        const product = makeProduct({ name: "produto 1", userId: "user-1", brand, category })

        await createProduct.execute({
            name: product.name,
            userId: product.userId,
            brandId: product.brand.id,
            categoryId: product.category.id,
            description: product.description
        })

        expect(productRepository.products).toHaveLength(1)
        expect(productRepository.products).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: "produto 1" })
        ]))
    })
})