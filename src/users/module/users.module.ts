import { Module } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UsersController } from '../controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user/user.entity';
import { HashingService } from '../../iam/hashing/hashing.service';
import { BcryptService } from '../../iam/hashing/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: HashingService, useClass: BcryptService },
  ],
})
export class UsersModule {}
