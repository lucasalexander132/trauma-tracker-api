import { Body, Controller, Post, Req, Res, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AddEntryDTO } from './dto';
import { JwtRefreshGuard } from 'src/auth/guard';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('entries')
    @UseGuards(JwtRefreshGuard)
    entries(
        @Body() dto: AddEntryDTO,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request
    ) {
        return this.userService.addEntry(dto, res, req);
    }

    @Get('tags')
    @UseGuards(JwtRefreshGuard)
    tags(
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
            return this.userService.getTags(res, req);
        }

    @Get('sections')
    @UseGuards(JwtRefreshGuard)
    sections(
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
            return this.userService.getSections(res, req);
        }
}
