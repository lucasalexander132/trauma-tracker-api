import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';
import { User } from 'generated/prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    const secret = config.get('JWT_SECRET');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return (
            req.cookies?.Authorization ??
            req.rawHeaders
              .find((header: string) => header.startsWith('Authorization'))
              ?.split('=')[1]
              .split(';')[0]
          );
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: {
    sub: string;
    user: Omit<User, 'hash'>;
  }): Promise<Omit<User, 'hash'>> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      }
    });
    if (!user) throw new ForbiddenException('No user with that id');
    const {
      id,
      username,
      email,
      createdAt,
      updatedAt,
      lastLoginAt,
      refreshToken,
      displayName,
      timezone,
      locale,
      emailVerified,
      isActive,
      oauthProvider,
      oauthId,
    } = user;
    return {
      id,
      username,
      email,
      createdAt,
      updatedAt,
      lastLoginAt,
      refreshToken,
      displayName,
      timezone,
      locale,
      emailVerified,
      isActive,
      oauthProvider,
      oauthId,
    };
  }
}
