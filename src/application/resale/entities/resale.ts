import { Customer } from "@application/customers/entities/customer";
import { Installment } from "@application/resale-installments/entities/installment";
import { ResaleSku } from "@application/resale-sku/entities/resale-sku";
import { Sku } from "@application/sku/entities/sku";
import { Replace } from "@helpers/Replace";
import { randomUUID } from "crypto";

export interface ResaleProps {
    customer: Customer;
    userId: string;
    totalValue: number;
    installments?: Installment[];
    resaleSkus?: ResaleSku[];
    canceledAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export class Resale {
    private _id: string;
    private props: ResaleProps;

    constructor(props: Replace<ResaleProps, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
        this._id = id ?? randomUUID()
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        }
    }

    public get id(): string {
        return this._id;
    }

    public set installments(installments: Installment[]) {
        this.props.installments = installments
    }

    public get installments(): Installment[] {
        return this.props.installments
    }

    public set resaleSkus(resaleSkus: ResaleSku[]) {
        this.props.resaleSkus = resaleSkus
    }

    public get resaleSkus(): ResaleSku[] {
        return this.props.resaleSkus
    }

    public calcel() {
        this.props.canceledAt = new Date()
    }

    public get canceledAt(): Date | null | undefined {
        return this.props.canceledAt
    }

    public set totalValue(totalValue: number) {
        this.props.totalValue = totalValue
    }

    public get totalValue() {
        return this.props.totalValue
    }

    public get customer(): Customer {
        return this.props.customer
    }

    public get userId(): string {
        return this.props.userId
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }

    public get updatedAt(): Date {
        return this.props.updatedAt;
    }

}