import { ApiProperty } from '@nestjs/swagger';

export class CreateOrUpdateCacheDto {
  @ApiProperty()
  key: string;
}
