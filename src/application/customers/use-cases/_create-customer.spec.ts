import { makeCustomer } from "@test/factories/customer/customer-factory"
import { InMemoryCustomersRepository } from "@test/repositories/customers/in-memory-customers"
import { CreateCustomer } from "./create-customer"

describe("Create a customer", () => {
    it('Should be able to create a new customer', async () => {

        const customersRepository = new InMemoryCustomersRepository()
        const createCustomer = new CreateCustomer(customersRepository)

        const customer = makeCustomer()

        const { customer: newCustomer } = await createCustomer.execute(customer)

        expect(customersRepository.customers).toHaveLength(1)
        expect(customersRepository.customers[0]).toEqual(newCustomer)

    })
})