import { makeBrand } from "@test/factories/brand/brand-factory";
import { InMemoryBrandRepository } from "@test/repositories/brand/in-memory-brand-repository";
import { GetBrandsOfResellers } from "./get-customers-of-resellers";

describe("Get Brands", () => {
    it("should be able to get brands", async () => {

        const brandRepository = new InMemoryBrandRepository()
        const getBrandOfResellers = new GetBrandsOfResellers(brandRepository)

        await brandRepository.create(makeBrand({ userId: "user-1" }))
        await brandRepository.create(makeBrand({ userId: "user-1" }))
        await brandRepository.create(makeBrand({ userId: "user-2" }))

        const { brands } = await getBrandOfResellers.execute({ userId: "user-1" })

        expect(brands).toHaveLength(2)
        expect(brands).toEqual(expect.arrayContaining([
            expect.objectContaining({ userId: "user-1" }),
            expect.objectContaining({ userId: "user-1" })
        ]))
    })
})