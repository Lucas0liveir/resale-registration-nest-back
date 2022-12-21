import { IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";


export class UpdateProductCategoryBody {

    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string
}