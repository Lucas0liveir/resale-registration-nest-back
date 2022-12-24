import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";


export class UpdateProductBody {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: string;

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

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    brandId: string
}