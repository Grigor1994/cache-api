import { ApiProperty } from '@nestjs/swagger';

class Keys {
  @ApiProperty()
  key: string;
}

export class KeysResponse {
  @ApiProperty({ type: [Keys] })
  keys: Keys;
}
