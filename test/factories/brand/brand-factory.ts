import { Brand, BrandProps } from "@application/sku-brand/entities/brand";
import { randomUUID } from "crypto";

type Override = Partial<BrandProps>

export function makeBrand(override: Override = {}) {
    return new Brand({
        name: "Lucas",
        userId: randomUUID(),
        ...override
    })
}