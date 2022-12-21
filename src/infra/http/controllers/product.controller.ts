import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { CreateProduct } from "@application/products/use-cases/create-product";
import { DeleteUserProduct } from "@application/products/use-cases/delete-user-product";
import { EditProduct } from "@application/products/use-cases/edit-product";
import { GetUserProducts } from "@application/products/use-cases/get-user-products";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateProductBody } from "../dtos/product/create-product-body";
import { GetProductCategory } from "@application/products-categories/use-cases/get-product-category";
import { ProductViewModel } from "../view-models/product/product-view-model";

@Controller("reseller")
export class ProductController {

    constructor(
        private getCategory: GetProductCategory,
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

        const { category } = await this.getCategory.execute({ id: categoryId })
        const { product } = await this.createProduct.execute({
            categoryId,
            description,
            name,
            userId
        })

        return { product: ProductViewModel.toHTTP(product, category) }
    }
}