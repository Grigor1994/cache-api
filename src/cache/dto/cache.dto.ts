export class CacheDto {
  readonly _id?: string;
  readonly key: string;
  readonly value: string;
  readonly expireAt?: number;
}
