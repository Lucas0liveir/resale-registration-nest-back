import { AccountRepository } from '@application/accounts/repositories/account-repository';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccoutViewModel } from "../view-models/account-view-model";
import * as bcrypt from "bcrypt";
import { User } from '@application/accounts/entities/User';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    
    constructor(
        private accountRepository: AccountRepository,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.accountRepository.findByEmail(email);

        const passwordMatch = await bcrypt.compare(pass, user.password)

        if (user && passwordMatch) {

            return AccoutViewModel.toHTTP(user);
        }

        return null;
    }

    async login(user: User) {
        const tokens = await this.getTokens(user.id, user.email, user.role);
        const refreshToken = await this.accountRepository.findRefreshTokenByUserId(user.id)

        if (!refreshToken) {
            const hashedRefreshToken = await this.hashData(tokens.refreshToken);
            await this.accountRepository.createRefreshToken(user.id, hashedRefreshToken)
        }

        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return {
            user: AccoutViewModel.toHTTP(user),
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken
        };
    }

    hashData(data: string) {
        return bcrypt.hash(data, 10)
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.accountRepository.updateRefreshToken(userId, hashedRefreshToken);
    }

    async refreshTokens(user: any, refreshToken: string) {
        const refresh_token = await this.accountRepository.findRefreshTokenByUserId(user.sub);

        if (!refresh_token) throw new ForbiddenException('Accesso negado')

        const refreshTokenMatches = await bcrypt.compare(
            refreshToken,
            refresh_token
        );

        if (!refreshTokenMatches) {
            throw new ForbiddenException('Accesso negado');
        }


        const tokens = await this.getTokens(user.sub, user.username, user.role);
        await this.updateRefreshToken(user.sub, tokens.refreshToken);
        return tokens;
    }

    async getTokens(userId: string, username: string, userRole: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                    role: userRole
                },
                {
                    secret: this.configService.get<string>('JWT_SECRET'),
                    expiresIn: '1m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configService.get<string>('JWT_SECRET_REFRESH_TOKEN'),
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}