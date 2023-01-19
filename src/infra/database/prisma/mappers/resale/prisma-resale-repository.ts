import { Resale } from "@application/resale/entities/resale";
import { Installments, Resale as RawResale, ResaleSku } from "@prisma/client";


export class PrismaResaleMapper {

    static toPrisma(resale: Resale) {
        return {
            resale: {
                id: resale.id,
                customer_id: resale.customer.id,
                userId: resale.userId,
                totalValue: resale.totalValue,
                canceled_at: null,
                createdAt: resale.createdAt,
                updatedAt: resale.updatedAt
            },
            installments: resale.installments.map(installment => (
                {
                    id: installment.id,
                    resale_id: resale.id,
                    userId: installment.userId,
                    payment_date: installment.paymentDate,
                    payment_value: installment.paymentValue,
                    is_paid: installment.isPaid,
                    createdAt: installment.createdAt,
                    updatedAt: installment.updatedAt
                }
            )),
            resaleSkus: resale.resaleSkus.map(resaleSku => ({
                quantity: resaleSku.quantity,
                sku_id: resaleSku.sku.id,
                resale_id: resale.id,
                createdAt: resaleSku.createdAt,
                updatedAt: resaleSku.updatedAt
            }))
        }
    }
}