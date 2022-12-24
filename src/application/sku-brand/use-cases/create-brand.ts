import { Injectable } from "@nestjs/common";
import { Brand } from "../entities/brand";
import { BrandRepository } from "../repositories/brand-repository";


interface CreateBrandRequest {
    name: string;
    userId: string;
}

@Injectable()
export class CreateBrand {

    constructor(
        private brandRepository: BrandRepository
    ) { }

    async execute(request: CreateBrandRequest) {
        const { name, userId } = request

        const brand = new Brand({
            name,
            userId
        })

        await this.brandRepository.create(brand)

        return { brand }
    }
}