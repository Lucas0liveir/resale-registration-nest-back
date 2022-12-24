import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateBrandBody {

    @IsNotEmpty()
    @IsString()
    @MaxLength(48)
    name: string;
    
}