import { Injectable } from "@nestjs/common";
import { Customer } from "../entities/customer";
import { CustomersRepository } from "../repositories/customer-repository";

interface CreateCustomerRequest {
    name: string;
    cell_phone?: string;
    userId: string;
}

@Injectable()
export class CreateCustomer {

    constructor(
        private customersRepository: CustomersRepository
    ) { }

    async execute(request: CreateCustomerRequest) {
        const { name, userId, cell_phone } = request

        const customer = new Customer({
            name,
            userId,
            cell_phone
        })

        await this.customersRepository.create(customer)

        return { customer }
    }
}