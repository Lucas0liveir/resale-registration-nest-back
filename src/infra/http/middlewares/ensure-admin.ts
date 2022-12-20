import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
export class EnsureAdminMiddleware implements NestMiddleware {
    use(req, res: Response, next: NextFunction) {

        if (!req.user) throw new UnauthorizedException("Acesso negado.")

        if (req.user.role !== "ADMIN") throw new UnauthorizedException("Acesso negado.")

        next();
    }
}