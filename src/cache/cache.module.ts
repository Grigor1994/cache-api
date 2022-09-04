import { Module } from '@nestjs/common';
import { CacheController } from './cache.controller';
import { CacheService } from './cache.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cache, CacheSchema } from './schemas/cache.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cache.name, schema: CacheSchema }]),
  ],
  controllers: [CacheController],
  providers: [CacheService],
})
export class CacheModule {}
