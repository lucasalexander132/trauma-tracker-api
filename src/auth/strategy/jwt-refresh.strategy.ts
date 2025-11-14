import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';

interface TokenPayload {
    sub: number;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(config: ConfigService, private authService: AuthService) {
        const secret = config.get('JWT_SECRET_REFRESH');
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req.cookies?.RefreshToken
            ]),
            ignoreExpiration: false,
            secretOrKey: secret,
            passReqToCallback: true
        });
    }

    async validate(request: Request, payload: TokenPayload) {
        return this.authService.veryifyUserRefreshToken(
          request.cookies?.RefreshToken,
          payload.sub
        );
    }
}