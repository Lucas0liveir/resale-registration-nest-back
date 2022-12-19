import { BadRequestException } from "@nestjs/common";

export class UserAlreadyExists extends BadRequestException {
    constructor() {
        super("Este endereço de email já foi cadastrado")
    }
}