import { Customer } from "@application/customers/entities/customer";
import { Customer as RawCustomer } from "@prisma/client";

export class PrismaCustomersMapper {
    static toPrisma(customer: Customer) {
        return {
            id: customer.id,
            name: customer.name,
            userId: customer.userId,
            cell_phone: customer.cellPhone,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt
        }
    }

    static toDomain(rawCustomer: RawCustomer) {
        return new Customer({
            name: rawCustomer.name,
            userId: rawCustomer.userId,
            cell_phone: rawCustomer.cell_phone,
            createdAt: rawCustomer.createdAt,
            updatedAt: rawCustomer.createdAt
        }, rawCustomer.id)
    }
}