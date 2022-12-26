import { Sku } from "@application/sku/entities/sku";
import { Replace } from "@helpers/Replace";
import { randomUUID } from "crypto";

export interface PricingProps {
    costPrice: number;
    price: number;
    sku: Sku;
    createdAt: Date;
    updatedAt: Date;
}

export class Pricing {
    private _id: string;
    private props: PricingProps;

    constructor(props: Replace<PricingProps, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
        this._id = id ?? randomUUID()
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date,
            updatedAt: props.updatedAt ?? new Date
        }
    }

    public get id(): string {
        return this._id;
    }

    public set costPrice(costPrice: number) {
        this.props.costPrice = costPrice
    }

    public get costPrice(): number {
        return this.props.costPrice
    }

    public set price(price: number) {
        this.props.price = price
    }

    public get price(): number {
        return this.props.price
    }

    public get sku(): Sku {
        return this.props.sku;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }

    public get updatedAt(): Date {
        return this.props.updatedAt;
    }
}