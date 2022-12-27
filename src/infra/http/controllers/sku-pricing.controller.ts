import { CreatePricing } from "@application/sku-pricing/use-cases/create-pricing";
import { GetSkuPricing } from "@application/sku-pricing/use-cases/get-sku-pricing";
import { UpdatePricing } from "@application/sku-pricing/use-cases/update-pricing";
import { Body, CacheInterceptor, Controller, Get, Param, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreatePricingBody } from "../dtos/sku-pricing/create-pricing-body";
import { PricingViewModel } from "../view-models/sku-pricing/pricing-view-model";

@Controller("reseller/sku")
@UseInterceptors(CacheInterceptor)
export class PricingController {

    constructor(
        private createPricing: CreatePricing,
        private getSkuPricing: GetSkuPricing,
        private updatePricing: UpdatePricing
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post("pricing/:id")
    async create(@Param("id") skuId, @Req() req, @Body() createPricingBody: CreatePricingBody) {
        const { costPrice, price } = createPricingBody
        const { userId } = req.user

        const { pricing } = await this.createPricing.execute({
            costPrice,
            price,
            skuId,
            userId
        })

        return { pricing: PricingViewModel.toHTTP(pricing) }
    }

    @UseGuards(JwtAuthGuard)
    @Put("pricing/:id/:skuId")
    async update(@Param("id") id, @Param("skuId") skuId, @Req() req, @Body() createPricingBody: CreatePricingBody) {
        const { costPrice, price } = createPricingBody
        const { userId } = req.user

        const { pricing } = await this.updatePricing.execute({
            id,
            costPrice,
            price,
            skuId,
            userId
        })

        return { pricing: PricingViewModel.toHTTP(pricing) }
    }

    @UseGuards(JwtAuthGuard)
    @Get("pricing/:id")
    async find(@Param("id") skuId, @Req() req) {
        const { userId } = req.user

        const { pricing } = await this.getSkuPricing.execute({
            skuId,
            userId
        })

        return { pricing: PricingViewModel.toHTTP(pricing) }
    }
}