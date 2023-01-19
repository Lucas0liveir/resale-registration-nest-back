import { Type } from "class-transformer";
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsInt,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    isUUID,
    IsUUID,
    ValidateNested
} from "class-validator";

class ResaleForm {
    @IsUUID()
    @IsNotEmpty()
    skuId: string;

    @IsInt()
    @IsNotEmpty()
    quantity: number;
}

class CustomerForm {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    name?: string;
}

export class CreateResaleBody {

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @Type(() => ResaleForm)
    resaleForm: ResaleForm[]

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @ArrayMinSize(12)
    paymentDates: string[];

    @IsObject()
    @IsNotEmpty()
    @Type(() => CustomerForm)
    customer: CustomerForm
}