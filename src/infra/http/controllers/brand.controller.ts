import { CreateBrand } from "@application/product-brand/use-cases/create-brand";
import { GetBrandsOfResellers } from "@application/product-brand/use-cases/get-brands-of-resellers";
import { Body, CacheInterceptor, Controller, Get, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBrandBody } from "../dtos/brand/create-brand-body";
import { BrandViewModel } from "../view-models/brand/brand-view-model";

@Controller("reseller")
@UseInterceptors(CacheInterceptor)
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