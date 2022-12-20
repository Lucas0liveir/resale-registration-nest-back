import { Customer } from "@application/customers/entities/customer";
import { CustomersRepository } from "@application/customers/repositories/customer-repository";

export class InMemoryCustomersRepository extends CustomersRepository {

    public customers: Customer[] = []

    async create(customer: Customer): Promise<void> {
        await this.customers.push(customer)
    }

    async findByUserId(userId: string): Promise<Customer[]> {
        return await this.customers.filter(item => item.userId === userId)
    }

    async findById(id: string): Promise<Customer> {
        return await this.customers.find(item => item.id === id)
    }

    async save(customer: Customer): Promise<void> {
        const customerIndex = await this.customers.findIndex(item => item.id === customer.id)

        if (customerIndex >= 0) {
            this.customers[customerIndex] = customer
        }
    }

}