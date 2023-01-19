import { Resale, ResaleProps } from "@application/resale/entities/resale";
import { makeCustomer } from "../customer/customer-factory";


type Override = Partial<ResaleProps>

export function makeResale (override: Override = {}, id?: string) {
    return new Resale({
        customer: makeCustomer(),
        totalValue: 200.50,
        userId: "user-1",
        ...override
    }, id)
}