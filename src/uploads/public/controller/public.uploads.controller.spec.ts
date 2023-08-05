import { Test, TestingModule } from '@nestjs/testing';
import { PublicUploadsController } from './public.uploads.controller';

describe('UploadsController', () => {
  let controller: PublicUploadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicUploadsController],
    }).compile();

    controller = module.get<PublicUploadsController>(PublicUploadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
