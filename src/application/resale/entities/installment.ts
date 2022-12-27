import { Replace } from "@helpers/Replace";
import { randomUUID } from "crypto";

export interface InstallmentProps {
    resaleId: string;
    paymentDate: Date;
    paymentValue: number;
    isPaid?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export class Installment {
    private _id: string;
    private props: InstallmentProps;

    constructor(props: Replace<InstallmentProps, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
        this._id = id ?? randomUUID()
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        }
    }

    public get id(): string {
        return this._id
    }

    public payUp() {
        this.props.isPaid = true;
    }

    public get isPaid (): boolean {
        return this.props.isPaid
    }

    public set paymentDate(paymentDate: Date) {
        this.props.paymentDate = paymentDate
    }

    public get paymentDate(): Date {
        return this.props.paymentDate
    }

    public set paymentValue(paymentValue: number) {
        this.props.paymentValue = paymentValue
    }

    public get paymentValue(): number {
        return this.props.paymentValue
    }
}