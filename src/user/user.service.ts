import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddEntryDTO } from './dto';
import { Response, Request } from 'express';
import { Section, Tag, User } from 'generated/prisma/client';

export type TResponseSection = Omit<Section, 'tags' | 'userId'> & { tags: Tag[] };

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}

    async addEntry(dto: AddEntryDTO, res: Response, req: Request) {
        if (!req.user) return;
        const { id } = req.user as User;
        const result = await this.prisma.event.create({
            data: {
                userId: id,
                encryptedContent: '',
                intensityMethod: dto.intensity.intensityMethod ?? '',
                intensityValue: dto.intensity.intensityValue,
                intensityRating: dto.intensity.intensityRating
            }
        });
        return result;
    }

    async getTags(res: Response, req: Request) {
        if (!req.user) return;
        const systemTags = await this.prisma.tag.findMany({
            where: {
                isSystem: true
            },
            select: {
                id: true,
                name: true,
                icon: true,
                color: true,
                category: true
            }
        });
        return systemTags;
    }
    async getSections(res: Response, req: Request) {
        if (!req.user) return;
        const systemSections = await this.prisma.section.findMany({
            select: {
                id: true,
                title: true,
                color: true,
                description: true,
                taggable: true,
                tags: true
            }
        });
        const responseSections: TResponseSection[] = [];
        for (const section of systemSections) {
            const sectionTags: Tag[] = [];
            for (const tag of section.tags) {
                const foundTag = await this.prisma.tag.findFirst({
                    where: {
                        id: tag.tagId
                    },
                    select: {
                        name: true,
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        userId: true,
                        icon: true,
                        color: true,
                        category: true,
                        isSystem: true,
                        i18nKey: true,
                    }
                });
                if (foundTag) sectionTags.push(foundTag);
            }
            responseSections.push({
                ...section,
                tags: sectionTags
            })
        }
        return responseSections;
    }
}
