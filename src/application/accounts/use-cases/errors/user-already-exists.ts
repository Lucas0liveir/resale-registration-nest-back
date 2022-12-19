

export class UserAlreadyExists extends Error {
    constructor() {
        super("este Email já foi cadastrado")
    }
}