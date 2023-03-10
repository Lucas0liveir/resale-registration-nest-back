import { Replace } from "@helpers/Replace";
import { randomUUID } from "crypto";

export interface CustomerProps {
    name: string;
    cell_phone?: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Customer {
    private _id: string;
    private props: CustomerProps

    constructor(props: Replace<CustomerProps,
        { cell_phone?: string, createdAt?: Date, updatedAt?: Date }>, id?: string) {
        this._id = id ?? randomUUID()
        this.props = {
            ...props,
            cell_phone: props.cell_phone ?? null,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        }
    }

    public get id(): string {
        return this._id;
    }

    public set name(name: string) {
        this.props.name = name
    }

    public get name(): string {
        return this.props.name;
    }

    public set cellPhone(cellPhone: string) {
        this.props.cell_phone = cellPhone
    }

    public get cellPhone(): string {
        return this.props.cell_phone;
    }

    public set userId(userId: string) {
        this.props.userId = userId
    }

    public get userId(): string {
        return this.props.userId;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }

    public get updatedAt(): Date {
        return this.props.updatedAt;
    }
}