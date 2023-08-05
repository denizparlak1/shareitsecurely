import { Test, TestingModule } from '@nestjs/testing';
import { ResetPasswordController } from './reset-password.controller';

describe('ResetPasswordController', () => {
  let controller: ResetPasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetPasswordController],
    }).compile();

    controller = module.get<ResetPasswordController>(ResetPasswordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
