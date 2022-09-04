import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cache, CacheDocument } from './schemas/cache.schema';
import * as randomstring from 'randomstring';
import { Common } from '../utils/constants';

@Injectable()
export class CacheService {
  constructor(
    @InjectModel(Cache.name) private readonly cacheModel: Model<CacheDocument>,
  ) {}

  async getAllKeys(): Promise<Cache[]> {
    return this.cacheModel.find({}).select('key -_id');
  }

  async createOrUpdateByKey(key: string, updateValue = false): Promise<Cache> {
    const result = await this.cacheModel.findOne({ key: key });

    const value = randomstring.generate(50);
    const expireAt = Date.now() + Common.CACHE_TTL_MS;

    if (!result) {
      if (await this.isLimitExceeded()) {
        const { _id } = await this.getOldestEntry();

        return this.cacheModel
          .findByIdAndUpdate(
            _id,
            {
              key,
              expireAt,
              value,
            },
            {
              new: true,
            },
          )
          .select('key value -_id');
      }

      return this.cacheModel.create({
        key,
        value,
        expireAt,
      });
    }

    const isExpired = result.expireAt < Date.now();

    return this.cacheModel
      .findOneAndUpdate(
        { key },
        { expireAt, ...(isExpired && updateValue ? { value } : {}) },
        { new: true },
      )
      .select('key value -_id');
  }

  async removeByKey(key: string): Promise<void> {
    await this.cacheModel.deleteOne({ key: key });
  }

  async removeAll(): Promise<void> {
    await this.cacheModel.deleteMany({});
  }

  private async isLimitExceeded() {
    const count = await this.cacheModel.count();
    return count >= Common.CACHE_LIMIT;
  }

  private async getOldestEntry() {
    return this.cacheModel.findOne({}).sort({ expireAt: 1 });
  }
}
