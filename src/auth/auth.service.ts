import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, SignInDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import { Request } from 'express';
import { User } from 'generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signin(dto: SignInDto, res: Response, req: Request) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      }
    });
    if (!user)
      throw new ForbiddenException('No user with that email or username');
    if (!user.hash) throw new ForbiddenException('No hash found for user');
    const pwMatches = await argon.verify(user.hash, dto.password);
    let refreshTokenMatches = false;
    if (user.refreshToken && req.cookies?.RefreshToken)
      refreshTokenMatches = await argon.verify(
        user.refreshToken,
        req.cookies?.RefreshToken,
      );
    if (pwMatches || refreshTokenMatches) {
      const token = await this.signToken(user);
      res.cookie('Authorization', token.access_token, {
        httpOnly: true,
        secure: this.config.get('NODE_ENV') === 'production',
        maxAge: this.config.get('JWT_EXPIRATION_TIME'),
      });
      res.cookie('RefreshToken', token.refresh_token, {
        httpOnly: true,
        secure: this.config.get('NODE_ENV') === 'production',
        maxAge: this.config.get('JWT_REFRESH_EXPIRATION_TIME'),
      });
      return {
        statusCode: 200,
        message: 'success',
        user
      };
    } else {
      throw new ForbiddenException('Incorrect credentials');
    }
  }

  async signup(dto: AuthDto, res: Response, req: Request) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.findFirst({
        where: {
          username: dto.username,
        },
        select: {
          username: true,
        },
      });
      if (user?.username === dto.username)
        throw new ForbiddenException('Username already in use');

      const createdUser = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          hash,
        },
      });
      if (!createdUser) throw new ForbiddenException('No user created');
      const signInDto: SignInDto = {
        username: dto.username,
        password: dto.password,
      };
      return this.signin(signInDto, res, req);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already in use');
        }
      }
      throw error;
    }
  }

  async signToken(
    user: User,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = {
      sub: user.id,
    };
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_EXPIRATION_TIME'),
      secret: this.config.get('JWT_SECRET'),
    });
    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_REFRESH_EXPIRATION_TIME'),
      secret: this.config.get('JWT_SECRET_REFRESH'),
    });
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: await argon.hash(refresh_token),
      },
    });
    return {
      access_token,
      refresh_token,
    };
  }

  async veryifyUserRefreshToken(
    RefreshToken: string,
    userId: string,
  ): Promise<Omit<User, 'hash'>> {
    const dbUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      }
    });
    if (!dbUser) throw new ForbiddenException('No user with that id');
    if (!dbUser.refreshToken)
      throw new ForbiddenException('No refresh token found for user');
    const refreshTokenMatches = await argon.verify(
      dbUser.refreshToken,
      RefreshToken,
    );
    if (!refreshTokenMatches)
      throw new ForbiddenException('Refresh token is not valid');
    const {
      id,
      username,
      createdAt,
      refreshToken,
      email,
      updatedAt,
      lastLoginAt,
      displayName,
      timezone,
      locale,
      emailVerified,
      isActive,
      oauthProvider,
      oauthId
    } = dbUser;
    return {
      id,
      username,
      createdAt,
      refreshToken,
      email,
      updatedAt,
      lastLoginAt,
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
