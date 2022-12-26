import { CreateSku } from "@application/sku/use-cases/create-sku";
import { GetProductSkus } from "@application/sku/use-cases/get-product-skus";
import { UpdateSku } from "@application/sku/use-cases/update-sku";
import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateSkuBody } from "../dtos/sku/create-sku-body";
import { SkuViewModel } from "../view-models/sku/sku-view-model";

@Controller("reseller")
export class SkuController {
    constructor(
        private createSku: CreateSku,
        private updateSku: UpdateSku,
        private getProductSkus: GetProductSkus
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post("sku")
    async create(@Req() req, @Body() createSkuBody: CreateSkuBody) {
        const { ean, especification, minStock, name, productId, stock, height, weight, width } = createSkuBody
        const { userId } = req.user
        const { sku } = await this.createSku.execute({
            ean,
            userId,
            especification,
            minStock,
            name,
            productId,
            stock,
            height,
            weight,
            width
        })

        return { sku: SkuViewModel.toHTTP(sku) }
    }

    @UseGuards(JwtAuthGuard)
    @Put("sku/:id")
    async update(@Param('id') id, @Req() req, @Body() updateSkuBody: CreateSkuBody) {
        const { ean, especification, minStock, name, productId, stock, height, weight, width } = updateSkuBody
        const { userId } = req.user
        const { sku } = await this.updateSku.execute({
            id,
            ean,
            userId,
            especification,
            minStock,
            name,
            productId,
            stock,
            height,
            weight,
            width
        })

        return { sku: SkuViewModel.toHTTP(sku) }
    }

    @UseGuards(JwtAuthGuard)
    @Get("sku/:productId")
    async findAll(@Param('productId') productId, @Req() req) {
        const { userId } = req.user
        const { skus } = await this.getProductSkus.execute({ productId, userId })

        return { sku: skus.map(SkuViewModel.toHTTP) }
    }
}