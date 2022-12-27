import { Installment } from "../entities/installment";

export abstract class InstallmentsRepository {
    abstract create(installments: Installment[]): Promise<void>;
    abstract findByResaleId(resaleId: string): Promise<void>;
    abstract findByUserId(userId: string): Promise<void>;
    abstract save(installment: Installment): Promise<void>;
}