import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from 'generated/prisma/client';
import { contextTags, emotionTags, traumaResponseTags } from 'src/prisma/seedData/tags';
import { sections } from 'src/prisma/seedData/sections';
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([this.user.deleteMany()]);
  }

  async seed() {
    console.log('Seeding tags...');
    
    const existingTags = await this.tag.findMany({
      where: { isSystem: true },
    });
    
    if (existingTags.length > 0) {
      console.log('✅ System tags already exist, skipping...');
      return;
    }
    
    const allTags = [
      ...traumaResponseTags,
      ...emotionTags,
      ...contextTags,
    ];

    for (const section of sections) {
      console.log('Loading', section);
      await this.section.create({
        data: {
          title: section.title,
          color: section.color,
          tags: {
            create: section.tags.map(tag => ({
              tag: {
                create: {
                  name: tag.name,
                  icon: tag.icon,
                  color: tag.color,
                  category: tag.category,
                  i18nKey: tag.i18nKey,
                  isSystem: tag.isSystem
                }
              }
            }))
          }
        }
      })
    }
    
    console.log(`✅  Seeded ${allTags.length} system tags`);
  }
}
