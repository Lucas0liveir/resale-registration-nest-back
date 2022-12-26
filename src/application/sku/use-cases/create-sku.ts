import { Product } from "@application/products/entities/product";
import { ProductRepository } from "@application/products/repositories/product-repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Sku } from "../entities/sku";
import { SkuRepository } from "../repositories/sku-repository";

interface CreateSkuRequest {
    name: string;
    ean: string;
    especification: string;
    weight?: number | null;
    height?: number | null;
    width?: number | null;
    userId: string;
    productId: string;
    stock: number;
    minStock: number;
}

interface CreateSkuResponse {
    sku: Sku
}

@Injectable()
export class CreateSku {

    constructor(
        private skuRepository: SkuRepository,
        private productRepository: ProductRepository
    ) { }

    async execute(request: CreateSkuRequest): Promise<CreateSkuResponse> {
        const { userId, ean, especification, minStock, name, productId, stock, height, weight, width } = request

        const product = await this.productRepository.findById(productId, userId)

        if (!product) {
            throw new BadRequestException("Acesso negado.")
        }

        const sku = new Sku({
            ean,
            especification,
            minStock,
            name,
            product,
            stock,
            height,
            weight,
            width
        })

        await this.skuRepository.create(sku)

        return { sku }
    }
}