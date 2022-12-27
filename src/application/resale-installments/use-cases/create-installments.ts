import { Injectable } from "@nestjs/common";
import { Installment } from "../entities/installment";

interface CreateInstallmentsRequest {
    resaleId: string;
    userId: string;
    totalValue: number;
    paymentDates: string[];
}

interface CreateInstallmentsResponse {
    installments: Installment[]
}

@Injectable()
export class CreateInstallments {

    async execute(request: CreateInstallmentsRequest): Promise<CreateInstallmentsResponse> {

        const { paymentDates, resaleId, totalValue, userId } = request

        const installments = paymentDates.map(item => {
            return new Installment({
                paymentDate: new Date(item),
                paymentValue: (totalValue / paymentDates.length),
                resaleId,
                userId,
                isPaid: false
            })
        })

        return { installments }
    }
}