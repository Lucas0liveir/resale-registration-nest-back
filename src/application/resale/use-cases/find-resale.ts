import { Injectable } from "@nestjs/common";
import { Resale } from "../entities/resale";
import { ResaleRepository } from "../repositories/resale-repository";


interface FindResaleRequest {
    userId: string;
}

interface FindResaleResponse {
    resales: Resale[]
}

@Injectable()
export class FindResale {

    constructor(
        private resaleRepository: ResaleRepository
    ) { }

    async execute(request: FindResaleRequest): Promise<FindResaleResponse> {

        const { userId } = request

        const resales = await this.resaleRepository.findAllByUserId(userId)

        return { resales }
    }
}