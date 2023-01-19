import { Customer } from "@application/customers/entities/customer";
import { Installment } from "@application/resale-installments/entities/installment";
import { ResaleSku } from "@application/resale-sku/entities/resale-sku";
import { Resale } from "@application/resale/entities/resale";
import { Sku } from "@application/sku/entities/sku";
import {
    Customer as RawCustomer,
    Installments as RawInstallments,
    Resale as RawResale,
    ResaleSku as RawResaleSku,
    SKU as RawSku
} from "@prisma/client";


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

    static toDomain(resale: RawResale & {
        customer: RawCustomer;
        installments: RawInstallments[];
        products: {
            resale_id: string;
            createdAt: Date;
            quantity: number;
            sku_id: string;
            sku: RawSku;
        }[]
    }) {
        return new Resale({
            customer: new Customer({
                name: resale.customer.name,
                userId: resale.userId,
                cell_phone: resale.customer.cell_phone,
                createdAt: resale.customer.createdAt,
                updatedAt: resale.customer.createdAt
            }, resale.customer_id),
            totalValue: Number(resale.totalValue),
            userId: resale.userId,
            canceledAt: resale.canceled_at,
            installments: resale.installments
                .map(installment => (new Installment({
                    paymentDate: installment.payment_date,
                    paymentValue: Number(installment.payment_value),
                    resaleId: resale.id,
                    userId: resale.userId,
                    isPaid: installment.is_paid,
                    createdAt: installment.createdAt,
                    updatedAt: installment.updatedAt
                }, installment.id))),
            resaleSkus: resale.products
                .map(resaleSku => (new ResaleSku({
                    quantity: resaleSku.quantity,
                    resaleId: resale.id,
                    sku: new Sku({
                        especification: resaleSku.sku.especification,
                        minStock: resaleSku.sku.min_stock,
                        name: resaleSku.sku.name,
                        stock: resaleSku.sku.stock,
                        ean: resaleSku.sku.ean,
                        height: resaleSku.sku.height,
                        weight: resaleSku.sku.weight,
                        width: resaleSku.sku.width,
                        createdAt: resaleSku.sku.createdAt,
                        updatedAt: resaleSku.sku.updatedAt
                    }, resaleSku.sku.id)
                })))
        }, resale.id)
    }
}