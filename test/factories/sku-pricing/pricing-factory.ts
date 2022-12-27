import { Pricing, PricingProps } from "@application/sku-pricing/entities/pricing";
import { makeSku } from "../sku/sku-factory";

type Override = Partial<PricingProps>

export function makePricing(override: Override = {}, id?: string) {
    return new Pricing({
        costPrice: 15.50,
        price: 35.90,
        sku: makeSku(),
        ...override
    }, id)
}