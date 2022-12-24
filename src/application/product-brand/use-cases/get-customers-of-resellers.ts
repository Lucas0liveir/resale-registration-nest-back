import { Injectable } from "@nestjs/common";
import { Brand } from "../entities/brand";
import { BrandRepository } from "../repositories/brand-repository";

interface GetBrandsOfResellersRequest {
    userId: string;
}

interface GetBrandsOfResellersResponse {
    brands: Brand[]
}

@Injectable()
export class GetBrandsOfResellers {

    constructor(
        private brandRepository: BrandRepository
    ) { }

    async execute(request: GetBrandsOfResellersRequest): Promise<GetBrandsOfResellersResponse> {
        const { userId } = request

        const brands = await this.brandRepository.findAllByUserId(userId)

        return { brands }
    }

}