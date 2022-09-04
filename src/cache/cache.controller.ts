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
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CacheResponse, KeysResponse } from './responses';
import { CreateOrUpdateCacheDto } from './dto';

@ApiTags('Cache API')
@Controller('caches')
export class CacheController {
  constructor(
    @Inject(CacheService) private readonly cacheService: CacheService,
  ) {}

  @ApiOperation({ summary: 'GET Cache by key' })
  @ApiParam({
    name: 'key',
    required: true,
    description: 'Should be an key of a cache',
    type: String,
  })
  @ApiResponse({ status: HttpStatus.OK, type: CacheResponse })
  @HttpCode(HttpStatus.OK)
  @Get(':key')
  async getByKey(@Param() params) {
    return this.cacheService.createOrUpdateByKey(params.key);
  }

  @ApiOperation({ summary: 'Create or Update Cache by key' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiBody({
    description: 'Create or Update Cache by key',
    type: CreateOrUpdateCacheDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  async createOrUpdate(@Body() body) {
    return this.cacheService.createOrUpdateByKey(body.key, true);
  }

  @ApiOperation({ summary: 'Get all stored keys' })
  @ApiResponse({ status: HttpStatus.OK, type: KeysResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllKeys() {
    return this.cacheService.getAllKeys();
  }

  @ApiOperation({ summary: 'Remove data from cache by key' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiParam({
    name: 'key',
    required: true,
    description: 'Should be an key of a cache',
    type: String,
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':key')
  async removeByKey(@Param() params) {
    await this.cacheService.removeByKey(params.key);
    return 'Successfully removed!';
  }

  @ApiOperation({ summary: 'Remove all stored data from cache' })
  @ApiResponse({ status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  @Delete()
  async removeAll() {
    await this.cacheService.removeAll();
    return 'Successfully all removed!';
  }
}
