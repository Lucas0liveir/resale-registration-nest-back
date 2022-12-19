import { User, UserProps } from "@application/accounts/entities/User";
import { Role } from "@prisma/client";
import { randomUUID } from "crypto";

type Override = Partial<UserProps>

export function makeUser(override: Override = {}) {
    return new User({
        name: "teste",
        email: "teste@email.com",
        password: randomUUID(),
        role: Role["RESELLER"],
        ...override
    })
}