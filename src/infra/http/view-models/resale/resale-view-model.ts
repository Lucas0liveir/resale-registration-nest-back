import { Resale } from "@application/resale/entities/resale";

export class ResaleViewModel {
    static toHTTP(resale: Resale) {
        return {
            id: resale.id,
            customer: resale.customer,
            installments: resale.installments.map(installment => ({
                paymentDate: installment.paymentDate,
                paymentValu: installment.paymentValue,
                isPaid: installment.isPaid
            })),
            skus: resale.resaleSkus.map(resaleSku => ({
                sku: resaleSku.sku,
                quantity: resaleSku.quantity
            }))
        }
    }
}