import { ProductCategory } from "@application/products-categories/entities/product-category";
import { Brand } from "@application/product-brand/entities/brand";
import { Replace } from "@helpers/Replace";
import { randomUUID } from "crypto";

export interface ProductProps {
    name: string;
    description: string;
    brand: Brand;
    userId: string;
    category?: ProductCategory;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Product {
    private _id: string;
    private props: ProductProps;

    constructor(props: Replace<ProductProps, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
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

    public set name(name: string) {
        this.props.name = name;
    }

    public get name(): string {
        return this.props.name;
    }

    public set description(description: string) {
        this.props.description = description;
    }

    public get description(): string {
        return this.props.description;
    }

    public set userId(userId: string) {
        this.props.userId = userId;
    }

    public get userId(): string {
        return this.props.userId;
    }

    public set categoryId(categoryId: string) {
        this.props.categoryId = categoryId;
    }

    public get categoryId() {
        return this.props.categoryId;
    }

    public get category(): ProductCategory {
        return this.props.category;
    }

    public get brand(): Brand {
        return this.props.brand;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }

    public get updatedAt(): Date {
        return this.props.updatedAt;
    }

}