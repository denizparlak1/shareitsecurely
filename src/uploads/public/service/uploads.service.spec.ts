import { Test, TestingModule } from '@nestjs/testing';
import { PublicUploadsService } from './public-uploads.service';

describe('UploadsService', () => {
  let service: PublicUploadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicUploadsService],
    }).compile();

    service = module.get<PublicUploadsService>(PublicUploadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
