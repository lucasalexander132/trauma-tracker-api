import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddEntryDTO, AddTagDTO, GetEntriesDTO } from './dto';
import { Response, Request } from 'express';
import { Event, Section, Tag, User } from 'generated/prisma/client';

export type TResponseSection = Omit<Section, 'tags' | 'userId'> & { tags: Tag[] };
export type TResponseEntries = Omit<Event, 'deletedAt' | 'version' | 'syncedAt' | 'isLocal' | 'encryptedContent' | 'createdAt' | 'userId' | 'updatedAt' | 'eventTags'> & { eventTags: Tag[] };


@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}

    async getEntries(dto: GetEntriesDTO, res: Response, req: Request) {
        if (!req.user) return;
        const { id } = req.user as User;

        let entries;

        const limit = dto ? dto.limit ?? 10 : 10;
        
        if (dto && typeof dto?.cursor !== 'undefined') {
            entries = await this.prisma.event.findMany({
                take: parseInt(limit+''),
                cursor: {
                    id: dto.cursor
                },
                orderBy: {
                    timestamp: 'desc'
                },
                where: {
                    userId: id
                },
                select: {
                    id: true,
                    timestamp: true,
                    hasFollowUp: true,
                    intensityMethod: true,
                    intensityRating: true,
                    intensityValue: true,
                    followUpAt: true,
                    followUpCompleted: true,
                    eventTags: true
                }
            });
        } else {
            entries = await this.prisma.event.findMany({
                take: parseInt(limit+''),
                orderBy: {
                    timestamp: 'desc'
                },
                where: {
                    userId: id
                },
                select: {
                    id: true,
                    timestamp: true,
                    hasFollowUp: true,
                    intensityMethod: true,
                    intensityRating: true,
                    intensityValue: true,
                    followUpAt: true,
                    followUpCompleted: true,
                    eventTags: true
                }
            });
        }
        if (!entries) return;
        // God, I call them entries but in the backend they're labelled events
        const responseEntries: TResponseEntries[] = [];
        for (const entry of entries) {
            const foundTags = await this.prisma.tag.findMany({
                orderBy: [
                    {
                        sortOrder: 'asc'
                    }
                ],
                where: {
                    OR: entry.eventTags.map((eventTag) => ({
                        id: eventTag.tagId
                    }))
                }
            });
            responseEntries.push({
                ...entry,
                eventTags: foundTags
            })
        }
        const nextCursor = entries.length === parseInt(limit+'') ? entries[entries.length - 1].id : null;
        return {
            responseEntries,
            nextCursor
        };
    }

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

        if (dto.eventTags && dto.eventTags.length > 0) {
            await Promise.all(
                dto.eventTags.map(tag =>
                    this.prisma.eventTag.create({
                        data: {
                            event: { connect: { id: result.id } },
                            tag: { connect: { id: tag.id } }
                        }
                    })
                )
            );
        }
        return result;
    }

    async addTag(dto: AddTagDTO, res: Response, req: Request) {
        if (!req.user) return;
        const { id } = req.user as User;
        const newTag = await this.prisma.tag.create({
            data: {
                userId: id,
                name: dto.name,
                icon: dto.icon,
                color: dto.color,
                category: dto.category,
                isSystem: false
            },
            select: {
                id: true,
                userId: true,
                name: true,
                icon: true,
                color: true,
                category: true,
                createdAt: true
            }
        });
        await this.prisma.sectionTag.create({
            data: {
                section: { connect: { id: dto.sectionId } },
                tag: { connect: { id: newTag.id } },
                user: { connect: { id: id } }
            }
        });
        return newTag;
    }

    async getTags(res: Response, req: Request) {
        if (!req.user) return;
        const { id } = req.user as User;
        const systemTags = await this.prisma.tag.findMany({
            where: {
                isSystem: true,
                userId: id
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
        const { id } = req.user as User;
        const systemSections = await this.prisma.section.findMany({
            orderBy: {
                sortOrder: 'asc'
            },
            select: {
                id: true,
                title: true,
                color: true,
                description: true,
                taggable: true,
                tags: {
                    orderBy: [
                        {
                            userId: 'asc'
                        },
                        {
                            createdAt: 'desc'
                        }],
                    where: {
                        OR: [
                            {
                                userId: null
                            },
                            {
                                userId: id
                            }
                        ]
                    }
                },
                sortOrder: true
            }
        });
        const responseSections: TResponseSection[] = [];
        for (const section of systemSections) {
            const foundTags = await this.prisma.tag.findMany({
                orderBy: [
                    {
                        sortOrder: 'asc'
                    }
                ],
                where: {
                    OR: section.tags.map((sectionTag) => ({
                        id: sectionTag.tagId
                    }))
                }
            });
            responseSections.push({
                ...section,
                tags: foundTags
            })
        }
        return responseSections;
    }
}
