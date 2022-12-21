import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";


export class CreateProductBody {

    @IsNotEmpty()
    @IsString()
    @MaxLength(48)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(240)
    description: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    categoryId: string
}