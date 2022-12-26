import { makeBrand } from "@test/factories/brand/brand-factory"
import { InMemoryBrandRepository } from "@test/repositories/brand/in-memory-brand-repository"
import { CreateBrand } from "./create-brand"


describe("Create a brand", () => {
    it('Should be able to create a new brand', async () => {

        const brandRepository = new InMemoryBrandRepository()
        const createCustomer = new CreateBrand(brandRepository)

        const brand = makeBrand()

        const { brand: newCustomer } = await createCustomer.execute(brand)

        expect(brandRepository.brand).toHaveLength(1)
        expect(brandRepository.brand[0]).toEqual(newCustomer)

    })
})