import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';

// import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { SortUrlController } from './sort-url/sort-url.controller';
import { SortUrlService } from './sort-url/sort-url.service';
import { SortUrlModule } from './sort-url/sort-url.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SortUrlSchema, SortUrl } from './sort-url/entities/sort-url.entity';

import {
  SortUrlBackupSchema,
  SortUrlBackup,
} from './sort-url/entities/sort-url-backup.entity';
// mongodb://localhost:27017

@Module({
  imports: [
    UserModule,
    AuthModule,
    SortUrlModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-example'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: SortUrl.name,
        schema: SortUrlSchema,
      },
      {
        name: SortUrlBackup.name,
        schema: SortUrlBackupSchema,
      },
    ]),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      url: 'redis://localhost:6379',
    }),
  ],
  controllers: [AppController, SortUrlController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    SortUrlService,
  ],
})
export class AppModule {}
