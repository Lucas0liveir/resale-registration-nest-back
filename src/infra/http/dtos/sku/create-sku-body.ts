import { IsEAN, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateSkuBody {
    @IsString()
    @IsNotEmpty()
    @MaxLength(56)
    name: string;

    @IsString()
    @IsOptional()
    @IsEAN()
    ean?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(56)
    especification: string;

    @IsInt()
    @IsOptional()
    weight?: number;

    @IsInt()
    @IsOptional()
    width?: number;

    @IsInt()
    @IsOptional()
    height?: number;

    @IsInt()
    @IsNotEmpty()
    stock: number;

    @IsInt()
    @IsNotEmpty()
    minStock: number;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    productId: string;
}