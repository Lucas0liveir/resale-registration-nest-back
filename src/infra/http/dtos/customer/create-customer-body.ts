import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateCustomerBody {

    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    name: string;

    @IsString()
    @IsOptional()
    cell_phone: string;
}