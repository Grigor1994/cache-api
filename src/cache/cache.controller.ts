import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(
    @Inject(CacheService) private readonly cacheService: CacheService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(':key')
  async getByKey(@Param() params) {
    return this.cacheService.createOrUpdateByKey(params.key);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async createOrUpdate(@Body() body) {
    return this.cacheService.createOrUpdateByKey(body.key, true);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllKeys() {
    return this.cacheService.getAllKeys();
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':key')
  async removeByKey(@Param() params) {
    await this.cacheService.removeByKey(params.key);
    return 'Successfully removed!';
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  async removeAll() {
    await this.cacheService.removeAll();
    return 'Successfully all removed!';
  }
}
