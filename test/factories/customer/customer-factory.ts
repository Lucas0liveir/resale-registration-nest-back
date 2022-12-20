import { Customer, CustomerProps } from "@application/customers/entities/customer";
import { randomUUID } from "crypto";

type Override = Partial<CustomerProps>

export function makeCustomer(override: Override = {}) {
    return new Customer({
        name: "Lucas",
        userId: randomUUID(),
        ...override
    })
}