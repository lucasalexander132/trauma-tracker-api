import { Body, Controller, Post, Req, Res, UseGuards, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AddEntryDTO, AddTagDTO, GetEntriesDTO } from './dto';
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

    @Get('entries')
    @UseGuards(JwtRefreshGuard)
    getEntries(
        @Query('cursor') cursor: string,
        @Query('limit') limit: number,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request
    ) {
        return this.userService.getEntries({
            cursor,
            limit
        }, res, req);
    }

    @Get('tags')
    @UseGuards(JwtRefreshGuard)
    tags(
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
            return this.userService.getTags(res, req);
        }

    @Post('tags')
    @UseGuards(JwtRefreshGuard)
    addTag(
        @Body() dto: AddTagDTO,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
            return this.userService.addTag(dto, res, req);
        }

    @Get('sections')
    @UseGuards(JwtRefreshGuard)
    sections(
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
            return this.userService.getSections(res, req);
        }
}
