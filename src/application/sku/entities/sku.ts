import { Product } from "@prisma/client";


export interface SkuProps {
    name: string;
    ean: string;
    especification: string;
    weight?: number | null;
    height?: number | null;
    width?: number | null;
    brand: any;
    product: Product;
    Pricing: any;
    stock: number;
    minStock: number;
    createdAt: Date;
    updatedAt: Date;


}