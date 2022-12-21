import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, NextFunction } from 'express';

@Injectable()
export class EnsureAdminMiddleware implements NestMiddleware {
    use(req, res: Response, next: NextFunction) {
        try {

            const [, token] = req.headers['authorization'].split(" ")
            const jwtService = new JwtService()

            const payload = jwtService.verify(token, { secret: process.env.JWT_SECRET })

            if (!payload) throw new UnauthorizedException("Acesso negado.")

            if (payload.role !== "ADMIN") throw new UnauthorizedException("Acesso negado.")

            next();

        } catch (e) {
            throw new UnauthorizedException("Acesso negado")
        }
    }
}