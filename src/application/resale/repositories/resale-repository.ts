import { Resale } from "../entities/resale";

export abstract class ResaleRepository {
    abstract create(resale: Resale): Promise<void>;
    abstract findById(resaleId: string): Promise<Resale>;
    abstract findAllByUserId(userId: string): Promise<Resale[]>
    abstract save(resale: Resale): Promise<void>;
}