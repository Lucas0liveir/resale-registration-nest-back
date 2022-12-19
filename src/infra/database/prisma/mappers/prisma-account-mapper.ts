import { User } from "@application/accounts/entities/User";
import { Role, User as RawUser } from "@prisma/client";


export class PrismaAccountMapper {
    static toPrisma(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            role: Role[user.role]
        }
    }

    static toDomain(rawUser: RawUser) {
        return new User({
            email: rawUser.email,
            password: rawUser.password,
            avatar: rawUser.avatar,
            name: rawUser.name,
            role: rawUser.role,
            createdAt: rawUser.createdAt,
            updatedAt: rawUser.updatedAt
        }, rawUser.id)
    }
}