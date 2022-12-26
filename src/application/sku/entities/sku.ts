import { Product } from "@application/products/entities/product";
import { Replace } from "@helpers/Replace";
import { randomUUID } from "crypto";

export interface SkuProps {
    name: string;
    ean: string;
    especification: string;
    weight?: number | null;
    height?: number | null;
    width?: number | null;
    product: Product;
    stock: number;
    minStock: number;
    createdAt: Date;
    updatedAt: Date;
}

export class Sku {
    private _id: string;
    private props: SkuProps;

    constructor(props: Replace<SkuProps, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
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

    public set especification(especification: string) {
        this.props.especification = especification;
    }

    public get especification(): string {
        return this.props.especification;
    }

    public set ean(ean: string) {
        this.props.ean = ean;
    }

    public get ean(): string {
        return this.props.ean;
    }

    public set weight(weight: number) {
        this.props.weight = weight;
    }

    public get weight(): number {
        return this.props.weight;
    }

    public set width(width: number) {
        this.props.width = width;
    }

    public get width(): number {
        return this.props.width;
    }

    public set height(height: number) {
        this.props.height = height;
    }

    public get height(): number {
        return this.props.height;
    }

    public set stock(stock: number) {
        this.props.stock = stock;
    }

    public get stock(): number {
        return this.props.stock;
    }

    public set minStock(minStock: number) {
        this.props.minStock = minStock;
    }

    public get minStock(): number {
        return this.props.minStock;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }

    public get updatedAt(): Date {
        return this.props.updatedAt;
    }

    public get product(): Product {
        return this.props.product
    }
}