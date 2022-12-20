import { makeCustomer } from "@test/factories/customer-factory";
import { InMemoryCustomersRepository } from "@test/repositories/customers/in-memory-customers";
import { GetCustomersOfResellers } from "./get-customers-of-resellers";

describe("Get Customers", () => {
    it("should be able to get customers", async () => {
        
        const customerRepository = new InMemoryCustomersRepository()
        const getCustomersOfResellers = new GetCustomersOfResellers(customerRepository)

        await customerRepository.create(makeCustomer({ userId: "user-1" }))
        await customerRepository.create(makeCustomer({ userId: "user-1" }))
        await customerRepository.create(makeCustomer({ userId: "user-2" }))

        const { customers } = await getCustomersOfResellers.execute({ userId: "user-1" })

        expect(customers).toHaveLength(2)
        expect(customers).toEqual(expect.arrayContaining([
            expect.objectContaining({ userId: "user-1" }),
            expect.objectContaining({ userId: "user-1" })
        ]))
    })
})