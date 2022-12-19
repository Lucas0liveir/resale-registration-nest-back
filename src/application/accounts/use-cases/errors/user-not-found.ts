import { UnauthorizedException } from "@nestjs/common";

export class UserNotFound extends UnauthorizedException {
    constructor() {
        super("E-mail ou senha incorretos")
    }
}