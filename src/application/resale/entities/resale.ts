import { Customer } from "@application/customers/entities/customer";
import { Replace } from "@helpers/Replace";
import { randomUUID } from "crypto";

export interface ResaleProps {
    customer: Customer;
    userId: string;
    totalValue: number;
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