import { CreateResale } from "@application/resale/use-cases/create-resale";
import { FindResale } from "@application/resale/use-cases/find-resale";
import { Body, CacheInterceptor, Controller, Post, Query, Request, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateResaleBody } from "../dtos/resale/create-resale-body";
import { ResaleViewModel } from "../view-models/resale/resale-view-model";


@Controller("reseller/resale")
@UseInterceptors(CacheInterceptor)
export class ResaleController {

    constructor(
        private createResale: CreateResale,
        private findResale: FindResale
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post("create")
    async create(@Request() req, @Body() createResaleBody: CreateResaleBody) {

        const { userId } = req.user
        const { customer, paymentDates, resaleForm } = createResaleBody

        const { resale } = await this.createResale.execute({
            customer: {
                id: customer.id,
                name: customer.name
            },
            paymentDates,
            resaleForm,
            userId
        })

        return { resale: ResaleViewModel.toHTTP(resale) }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async findAll(@Request() req) {
        const { userId } = req.user

        const { resales } = await this.findResale.execute({
            userId
        })

        return { resales: resales.map(ResaleViewModel.toHTTP) }
    }
}