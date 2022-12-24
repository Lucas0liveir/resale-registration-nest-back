import { Body, CacheInterceptor, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DeleteProductCategory } from "@application/products-categories/use-cases/delete-product-category";
import { CreatProductCategories } from "@application/products-categories/use-cases/create-product-categories";
import { GetProductCategories } from "@application/products-categories/use-cases/get-product-categories";
import { UpdateProductCategory } from "@application/products-categories/use-cases/update-product-category";
import { CreateProductCategoryBody } from "../dtos/product-category/create-product-category-body";
import { ProductCategoryViewModel } from "../view-models/product-category/product-category-view-model";
import { UpdateProductCategoryBody } from "../dtos/product-category/update-product-category-body";
import { ProductCategory } from "@application/products-categories/entities/product-category";


@Controller("reseller")
@UseInterceptors(CacheInterceptor)
export class ProductCategoryController {

    constructor(
        private createProductCategory: CreatProductCategories,
        private deleteProductCategory: DeleteProductCategory,
        private getProductCategories: GetProductCategories,
        private updateProductCategory: UpdateProductCategory
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post("products_categories")
    async create(@Req() req, @Body() createProductCategoryBody: CreateProductCategoryBody) {
        const { names } = createProductCategoryBody
        const { userId } = req.user

        const { categories } = await this.createProductCategory.execute({ names, userId })

        return { categories: categories.map(ProductCategoryViewModel.toHTTP) }
    }

    @UseGuards(JwtAuthGuard)
    @Get("products_categories")
    async getAll(@Req() req) {
        const { userId } = req.user
        const { categories } = await this.getProductCategories.execute({ userId })

        return { categories: categories.map(ProductCategoryViewModel.toHTTP) }
    }

    @UseGuards(JwtAuthGuard)
    @Put("products_categories")
    async update(@Req() req, @Body() updateProductCategoryBody: UpdateProductCategoryBody) {
        const { name, id } = updateProductCategoryBody
        const { userId } = req.user

        const category = new ProductCategory({
            name,
            userId
        }, id)

        await this.updateProductCategory.execute({ category })
    }

    @UseGuards(JwtAuthGuard)
    @Delete("products_categories/:id")
    async delete(@Param('id') id, @Req() req) {
        const { userId } = req.user
        await this.deleteProductCategory.execute({ id, userId })
    }
}