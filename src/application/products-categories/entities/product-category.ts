import { Replace } from "@helpers/Replace";
import { randomUUID } from "crypto";

export interface ProductCategoryProps {
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class ProductCategory {
    private _id: string;
    private props: ProductCategoryProps;

    constructor(props: Replace<ProductCategoryProps, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
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

    public set name(name: string) {
        this.props.name = name
    }

    public get name(): string {
        return this.props.name
    }

    public set userId(userId: string) {
        this.props.userId = userId
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