import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get<MongooseModuleOptions>('mongo_db');
      },
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule {}
