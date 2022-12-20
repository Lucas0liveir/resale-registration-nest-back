import { Injectable } from "@nestjs/common";
import { Customer } from "../entities/customer";
import { CustomersRepository } from "../repositories/customer-repository";

interface GetCustomersOfResellersRequest {
    userId: string;
}

interface GetCustomersOfResellersResponse {
    customers: Customer[]
}

@Injectable()
export class GetCustomersOfResellers {

    constructor(
        private customerRepository: CustomersRepository
    ) { }

    async execute(request: GetCustomersOfResellersRequest): Promise<GetCustomersOfResellersResponse> {
        const { userId } = request

        const customers = await this.customerRepository.findByUserId(userId)

        return { customers }
    }

}