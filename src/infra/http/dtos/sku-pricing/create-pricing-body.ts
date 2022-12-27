import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePricingBody {
    @IsNumber()
    @IsNotEmpty()
    costPrice: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}