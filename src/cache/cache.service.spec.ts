import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';
import { getModelToken } from '@nestjs/mongoose';
import { Cache } from './schemas/cache.schema';
import { Model } from 'mongoose';

const mockCache = {
  key: '5516f8f3-956e-4f88-9f53-4367855844525154',
  value: 'WkKUjj7kSHf62tC7ZJtIoUCzd7Cy0j63kBYdoWOvSnmDf2VVbq',
  expireAt: 1662326684803,
};

describe('CacheService', () => {
  let service: CacheService;
  let model: Model<Cache>;

  const mockKey = {
    key: '5516f8f3-956e-4f88-9f53-4367855844525152',
  };

  const keysArray = [
    {
      key: '5516f8f3-956e-4f88-9f53-4367855844525152',
    },
    {
      key: '5516f8f3-956e-4f88-9f53-43678558445251',
    },
    {
      key: '4f88-956e-4f88-9f53-5516f8f35516f8f3',
    },
    {
      key: '5516f8f3-956e-4f88-9f53-4367855844525152',
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: getModelToken(Cache.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockCache),
            constructor: jest.fn().mockResolvedValue(mockCache),
            find: jest.fn(),
            create: jest.fn(),
            select: jest.fn(),
            count: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    model = module.get<Model<Cache>>(getModelToken('Cache'));
    model.deleteOne = jest.fn().mockResolvedValue(() => Promise.resolve(true));
    model.deleteMany = jest.fn().mockResolvedValue(() => Promise.resolve(true));
    model.create = jest.fn().mockResolvedValue(
      (): Promise<Cache> =>
        Promise.resolve({
          ...mockCache,
        }),
    );
    model.findOne = jest.fn().mockResolvedValue(
      (): Promise<Cache> =>
        Promise.resolve({
          ...mockCache,
        }),
    );
    model.count = jest.fn().mockResolvedValue(() => Promise.resolve(0));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cache keys', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      select: jest.fn().mockResolvedValueOnce(keysArray),
    } as any);
    const keys = await service.getAllKeys();
    expect(keys).toEqual(keysArray);
  });

  it('should delete data from cache by key', async () => {
    const key = '5516f8f3-956e-4f88-9f53-4367855844525154';
    await service.removeByKey(key);
    expect(model.deleteOne).toHaveBeenCalledTimes(1);
  });

  it('should delete all stored data from cache', async () => {
    await service.removeAll();
    expect(model.deleteMany).toHaveBeenCalledTimes(1);
  });

  it('should get data by key', async () => {
    const key = '5516f8f3-956e-4f88-9f53-4367855844525154';
    jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
      select: jest.fn().mockResolvedValueOnce(mockKey),
    } as any);
    const result = await service.createOrUpdateByKey(key);
    expect(result).toEqual(mockKey);
    expect(model.findOne).toHaveBeenCalledTimes(1);
  });
});
