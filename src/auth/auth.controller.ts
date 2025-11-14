import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignInDto } from './dto';
import { Response, Request } from 'express';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'generated/prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return this.authService.signup(dto, res, req);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return this.authService.signin(dto, res, req);
  }

  @Post('signout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('Authorization');
    res.clearCookie('RefreshToken');
    return { message: 'Logged out' };
  }

  @Get('me')
  @UseGuards(JwtRefreshGuard)
  getMe(res: Response, @Req() req: Request) {
    return req.user;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  refresh(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const user = req.user as User;
    return this.authService.signin(
      {
        username: user.username,
        password: '',
        refreshToken: user.refreshToken ?? undefined,
      },
      res,
      req,
    );
  }
}
