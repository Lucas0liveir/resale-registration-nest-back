import { Body, Controller, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CreateProduct } from "@application/products/use-cases/create-product";
import { DeleteUserProduct } from "@application/products/use-cases/delete-user-product";
import { EditProduct } from "@application/products/use-cases/edit-product";
import { GetUserProducts } from "@application/products/use-cases/get-user-products";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateProductBody } from "../dtos/product/create-product-body";
import { ProductViewModel } from "../view-models/product/product-view-model";
import { UpdateProductBody } from "../dtos/product/update-product-body";

@Controller("reseller")
export class ProductController {

    constructor(
        private createProduct: CreateProduct,
        private deleteUserProduct: DeleteUserProduct,
        private editProduct: EditProduct,
        private getUserProducts: GetUserProducts
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post("product")
    async create(@Req() request, @Body() createProductBody: CreateProductBody) {
        const { categoryId, description, name } = createProductBody
        const { userId } = request.user

        const { product } = await this.createProduct.execute({
            categoryId,
            description,
            name,
            userId
        })

        return { product: ProductViewModel.toHTTP(product) }
    }

    @UseGuards(JwtAuthGuard)
    @Put("product")
    async Edit(@Req() request, @Body() updateProductBody: UpdateProductBody) {
        const { id, categoryId, description, name } = updateProductBody
        const { userId } = request.user

        const { product } = await this.editProduct.execute({
            categoryId,
            description,
            id,
            name,
            userId
        })

        return { product: ProductViewModel.toHTTP(product) }
    }

    @UseGuards(JwtAuthGuard)
    @Get("products")
    async get(@Req() request) {

        const { userId } = request.user

        const { products } = await this.getUserProducts.execute({ userId })

        return { products: products.map(ProductViewModel.toHTTP) }
    }
}