import { LocalAuthGuard } from '@infra/http/auth/guards/local-auth.guard';
import { Controller, Request, Post, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

import { RefreshTokenGuard } from '../auth/guards/refreshToken.guard';

@Controller('accounts')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('reseller/auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

    @UseGuards(RefreshTokenGuard)
    @Get('reseller/auth/refresh')
    refreshTokens(@Req() req) {
        const user = req.user
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshTokens(user, refreshToken);
    }

}