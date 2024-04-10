import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import * as base62 from 'base62';
import {
  SortUrlBackup,
  SortUrlBackupDocument,
} from './entities/sort-url-backup.entity';
import { SortUrl, SortUrlDocument } from './entities/sort-url.entity';
import { Model } from 'mongoose';

@Injectable()
export class SortUrlService {
  constructor(
    @InjectModel(SortUrlBackup.name)
    private backupModal: Model<SortUrlBackupDocument>,
    @InjectModel(SortUrl.name)
    private urlModal: Model<SortUrlDocument>,
  ) {}

  @Cron('45 * * * * *')
  async handleCron() {
    let count = await this.backupModal.countDocuments().exec();
    while (count >= 300) {
      const url = this.generateShortUrl();

      const isExists = await this.backupModal.exists({
        sortUrl: url,
      });
      if (!isExists) {
        const create = new this.backupModal({ sortUrl: url });
        await create.save();
      }
      count = await this.backupModal.countDocuments().exec();
      console.log(count);
    }
  }

  generateShortUrl(len: number = 6): string {
    let str = '';
    for (let i = 0; i < len; i++) {
      const num = Math.floor(Math.random() * 62);
      str += base62.encode(num);
    }
    return str;
  }
}
