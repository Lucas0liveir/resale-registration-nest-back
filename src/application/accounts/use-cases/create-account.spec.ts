import { makeUser } from "@test/factories/user-factory";
import { InMemoryAccountRepository } from "@test/repositories/accounts/in-memory-account-repository";
import { CreateResellerAccount } from "./create-reseller-account";
import { UserAlreadyExists } from "./errors/user-already-exists";

describe("Create Account", () => {
    it("Should be able to create a reseller user account", async () => {

        const accountRepository = new InMemoryAccountRepository()
        const createResellerAccount = new CreateResellerAccount(accountRepository)

        const newUser = makeUser()

        const { user } = await createResellerAccount.execute({
            email: newUser.email,
            name: newUser.name,
            password: newUser.password,
            role: "RESELLER"
        })

        expect(accountRepository.user).toHaveLength(1)
        expect(accountRepository.user[0]).toEqual(user)
        expect(accountRepository.user).toEqual(expect.arrayContaining([
            expect.objectContaining({ role: "RESELLER" })
        ]))
    })

    it("Should not be able to create a account if user already exists", async () => {

        const accountRepository = new InMemoryAccountRepository()
        const createResellerAccount = new CreateResellerAccount(accountRepository)

        const newUser = makeUser()

        await createResellerAccount.execute({
            email: newUser.email,
            name: newUser.name,
            password: newUser.password,
            role: "RESELLER"
        })

        expect(async () => {
            await createResellerAccount.execute({
                email: newUser.email,
                name: newUser.name,
                password: newUser.password,
                role: "RESELLER"
            })
        }).rejects.toThrowError(UserAlreadyExists)
    })
})