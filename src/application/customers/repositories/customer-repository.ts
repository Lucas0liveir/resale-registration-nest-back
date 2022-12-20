import { Customer } from "../entities/customer";

export abstract class CustomersRepository {
    abstract create(customer: Customer): void;
    abstract findByUserId(userId: string): Promise<Customer[] | null>;
    abstract findById(id: string): Promise<Customer | null>;
    abstract save(customer: Customer): Promise<void>;
}