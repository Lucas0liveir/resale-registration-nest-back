import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
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
export class ProductCategoryController {

    constructor(
        private createProductCategory: CreatProductCategories,
        private deleteProductCategory: DeleteProductCategory,
        private getProductCategories: GetProductCategories,
        private updateProductCategory: UpdateProductCategory
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post("products_categories")
    async create(@Req() request, @Body() createProductCategoryBody: CreateProductCategoryBody) {
        const { names } = createProductCategoryBody
        const { categories } = await this.createProductCategory.execute({ names })

        return { categories: categories.map(ProductCategoryViewModel.toHTTP) }
    }

    @UseGuards(JwtAuthGuard)
    @Get("products_categories")
    async getAll(@Req() request) {

        const { categories } = await this.getProductCategories.execute()

        return { categories: categories.map(ProductCategoryViewModel.toHTTP) }
    }

    @UseGuards(JwtAuthGuard)
    @Put("products_categories")
    async update(@Req() request, @Body() updateProductCategoryBody: UpdateProductCategoryBody) {
        const { name, id } = updateProductCategoryBody
        const category = new ProductCategory({
            name
        }, id)

        await this.updateProductCategory.execute({ category })
    }

    @UseGuards(JwtAuthGuard)
    @Delete("products_categories/:id")
    async delete(@Param('id') id) {
        await this.deleteProductCategory.execute({ id })
    }
}