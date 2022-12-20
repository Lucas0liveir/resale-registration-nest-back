import { Customer } from "@application/customers/entities/customer";

export class CustomerViewModel {

    static toHTTP(customer: Customer) {
        return {
            id: customer.id,
            name: customer.name,
            cell_phone: customer.cellPhone
        }
    }
}