import { Test, TestingModule } from '@nestjs/testing';
import { PrivateUploadsController } from './private.uploads.controller';

describe('PrivateController', () => {
  let controller: PrivateUploadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateUploadsController],
    }).compile();

    controller = module.get<PrivateUploadsController>(PrivateUploadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
