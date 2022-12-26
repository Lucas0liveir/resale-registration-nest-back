import { Product } from "@application/products/entities/product";
import { ProductRepository } from "@application/products/repositories/product-repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Sku } from "../entities/sku";
import { SkuRepository } from "../repositories/sku-repository";

interface UpdateSkuRequest {
    id: string;
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

interface UpdateSkuResponse {
    sku: Sku
}

@Injectable()
export class UpdateSku {

    constructor(
        private skuRepository: SkuRepository,
        private productRepository: ProductRepository
    ) { }

    async execute(request: UpdateSkuRequest): Promise<UpdateSkuResponse> {
        const {id, userId, ean, especification, minStock, name, productId, stock, height, weight, width } = request

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
        }, id)

        await this.skuRepository.save(sku)

        return { sku }
    }
}