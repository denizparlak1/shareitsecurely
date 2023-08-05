import { Test, TestingModule } from '@nestjs/testing';
import { PrivateService } from './private.service';

describe('Service', () => {
  let service: PrivateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivateService],
    }).compile();

    service = module.get<PrivateService>(PrivateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
