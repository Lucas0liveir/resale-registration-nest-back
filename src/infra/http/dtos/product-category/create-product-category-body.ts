import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";


export class CreateProductCategoryBody {

    @IsArray({ message: "O parâmetro deve ser um array de strings" })
    @ArrayMinSize(1)
    names: string[]
}