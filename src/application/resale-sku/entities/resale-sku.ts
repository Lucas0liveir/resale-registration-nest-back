import { Sku } from "@application/sku/entities/sku";
import { Replace } from "@helpers/Replace";
import { randomUUID } from "crypto";

export interface ResaleSkuProps {
    sku: Sku;
    resaleId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export class ResaleSku {
    private _id: string;
    private props: ResaleSkuProps;

    constructor(props: Replace<ResaleSkuProps, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
        this._id = id ?? randomUUID()
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        }
    }

    public get id() {
        return this._id;
    }

    public set sku(sku: Sku) {
        this.props.sku = sku;
    }

    public get sku(): Sku {
        return this.props.sku
    }

    public set quantity(quantity: number) {
        this.props.quantity = quantity;
    }

    public get quantity(): number {
        return this.props.quantity
    }

    public set resaleId(resaleId: string) {
        this.props.resaleId = resaleId;
    }

    public get resaleId(): string {
        return this.props.resaleId
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }

    public get updatedAt(): Date {
        return this.props.updatedAt;
    }
}