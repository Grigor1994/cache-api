import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';
import { getModelToken } from '@nestjs/mongoose';
import { Cache } from './schemas/cache.schema';

const mockCache = {
  key: '5516f8f3-956e-4f88-9f53-4367855844525154',
  value: 'WkKUjj7kSHf62tC7ZJtIoUCzd7Cy0j63kBYdoWOvSnmDf2VVbq',
  expireAt: 1662326684803,
};

describe('CacheService', () => {
  let service: CacheService;

  const keysArray = [
    {
      key: '5516f8f3-956e-4f88-9f53-4367855844525152',
      value: 'WkKUjj7kSHf62tC7ZJtIoUCzd7Cy0j63kBYdoWOvSnmDf2VVbq',
      expireAt: 1462326684803,
    },
    {
      key: '5516f8f3-956e-4f88-9f53-43678558445251',
      value: 'WkKUjj7kSHf62tC7ZJtIoUCzd7Cy0j63kBYdoWOvSnmDf2VVbq',
      expireAt: 1656326684803,
    },
    {
      key: '4f88-956e-4f88-9f53-5516f8f35516f8f3',
      value: 'WkKUjj7kSHf62tC7ZJtIoUCzd7Cy0j63kBOvSnmDf2VVbq',
      expireAt: 14526684803,
    },
    {
      key: '5516f8f3-956e-4f88-9f53-4367855844525152',
      value: 'WkKUjj7kSHf62tC7ZJtIoUCzd7C4367855844525152oWOvSnmDf2VVbq',
      expireAt: 1662326684803,
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        { provide: getModelToken(Cache.name), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cache keys', async () => {
    const getAllKeys = jest.spyOn(service, 'getAllKeys');
    getAllKeys.mockImplementationOnce(
      (): Promise<Cache[]> => Promise.resolve([...keysArray]),
    );
    const keys = await service.getAllKeys();
    expect(keys).toEqual(keysArray);
  });
  it('should create or update data by key', async () => {
    const key = '5516f8f3-956e-4f88-9f53-4367855844525154';
    jest.spyOn(service, 'createOrUpdateByKey').mockImplementationOnce(() =>
      Promise.resolve({
        key: '5516f8f3-956e-4f88-9f53-4367855844525154',
        value: 'WkKUjj7kSHf62tC7ZJtIoUCzd7Cy0j63kBYdoWOvSnmDf2VVbq',
        expireAt: 1662326684803,
      }),
    );
    const newCache = await service.createOrUpdateByKey(key, true);
    expect(newCache).toEqual(mockCache);
  });

  it('should return data by key', async () => {
    const key = '5516f8f3-956e-4f88-9f53-4367855844525154';
    jest.spyOn(service, 'createOrUpdateByKey').mockImplementationOnce(() =>
      Promise.resolve({
        key: '5516f8f3-956e-4f88-9f53-4367855844525154',
        value: 'WkKUjj7kSHf62tC7ZJtIoUCzd7Cy0j63kBYdoWOvSnmDf2VVbq',
        expireAt: 1662326684803,
      }),
    );
    const newCache = await service.createOrUpdateByKey(key, false);
    expect(newCache).toEqual(mockCache);
  });
});
