import { CreateInstallments } from "./create-installments"

describe("Create installments", () => {

    it("Should be able to create installments", async () => {
        const createInstallments = new CreateInstallments()

        const paymentDates = [new Date(2022, 11, 28, 1, 1, 1, 1).toISOString(), new Date(2023, 0, 28, 1, 1, 1, 1).toISOString()]

        const { installments } = await createInstallments.execute({
            paymentDates,
            resaleId: "test-1",
            totalValue: 500,
            userId: "user-1"
        })

        expect(installments).toEqual(expect.arrayContaining([
            expect.objectContaining({ props: expect.objectContaining({ paymentValue: 250, paymentDate: new Date(2022, 11, 28, 1, 1, 1, 1) }) }),
            expect.objectContaining({ props: expect.objectContaining({ paymentValue: 250, paymentDate: new Date(2023, 0, 28, 1, 1, 1, 1) }) })
        ]))
    })
})