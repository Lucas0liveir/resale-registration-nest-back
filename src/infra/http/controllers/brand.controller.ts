import { CreateBrand } from "@application/sku-brand/use-cases/create-brand";
import { GetBrandsOfResellers } from "@application/sku-brand/use-cases/get-customers-of-resellers";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBrandBody } from "../dtos/brand/create-brand-body";
import { BrandViewModel } from "../view-models/brand/brand-view-model";

@Controller("reseller")
export class BrandController {

    constructor(
        private getBrandOfResellers: GetBrandsOfResellers,
        private createBrand: CreateBrand
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post("brand/create")
    async create(@Req() req, @Body() createBrandBody: CreateBrandBody) {
        const { name } = createBrandBody

        const { userId } = req.user

        const { brand } = await this.createBrand.execute({ name, userId })

        return { brand: BrandViewModel.toHTTP(brand) }
    }

    @UseGuards(JwtAuthGuard)
    @Get("brands")
    async getFromUserId(@Req() req) {
        const { userId } = req.user

        const { brands } = await this.getBrandOfResellers.execute({ userId })

        return { brands: brands.map(BrandViewModel.toHTTP) }
    }

}