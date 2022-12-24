import { CreateCustomer } from "@application/customers/use-cases/create-customer";
import { GetCustomersOfResellers } from "@application/customers/use-cases/get-customers-of-resellers";
import { Body, CacheInterceptor, Controller, Get, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCustomerBody } from "../dtos/customer/create-customer-body";
import { CustomerViewModel } from "../view-models/customer/customer-view-model";

@Controller("reseller")
@UseInterceptors(CacheInterceptor)
export class CustomerController {

    constructor(
        private getCustomersOfResellers: GetCustomersOfResellers,
        private createCustomer: CreateCustomer
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post("customer/create")
    async create(@Req() req, @Body() createCustomerBody: CreateCustomerBody) {
        const { cell_phone, name } = createCustomerBody

        const { userId } = req.user

        const { customer } = await this.createCustomer.execute({ name, cell_phone, userId })

        return { customer: CustomerViewModel.toHTTP(customer) }
    }

    @UseGuards(JwtAuthGuard)
    @Get("customers")
    async getFromUserId(@Req() req) {
        const { userId } = req.user

        const { customers } = await this.getCustomersOfResellers.execute({ userId })

        return { customers: customers.map(CustomerViewModel.toHTTP) }
    }

}