import { ApiProperty } from '@nestjs/swagger';

export class CacheResponse {
  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;
}
