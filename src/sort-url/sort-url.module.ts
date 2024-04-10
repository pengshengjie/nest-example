import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SortUrlController } from './sort-url.controller';
import { SortUrlService } from './sort-url.service';
import {
  SortUrlBackup,
  SortUrlBackupSchema,
} from './entities/sort-url-backup.entity';
import { SortUrl, SortUrlSchema } from './entities/sort-url.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SortUrl.name, schema: SortUrlSchema },
      {
        name: SortUrlBackup.name,
        schema: SortUrlBackupSchema,
      },
    ]),
  ],
  controllers: [SortUrlController],
  providers: [SortUrlService],
})
export class SortUrlModule {}
