import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CacheDocument = Cache & Document;

@Schema()
export class Cache {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true, default: Date.now() })
  expireAt: number;
}

export const CacheSchema = SchemaFactory.createForClass(Cache);
