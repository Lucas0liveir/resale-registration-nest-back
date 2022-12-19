import { User } from "@application/accounts/entities/User";


export class AccoutViewModel {

    static toHTTP(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }
    }
}