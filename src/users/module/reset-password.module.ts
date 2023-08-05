import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordReset } from '../entities/reset-password/password.reset.entity';
import { PasswordResetController } from '../controller/reset-password.controller';
import { User } from '../entities/user/user.entity';
import { MailService } from '../../mail/mail.service';
import { ResetPasswordService } from '../service/reset-password.service';
import { HashingService } from '../../iam/hashing/hashing.service';
import { BcryptService } from '../../iam/hashing/bcrypt.service';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from '../service/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordReset]),
    TypeOrmModule.forFeature([User]),
    ConfigModule,
  ],
  controllers: [PasswordResetController],
  providers: [
    ResetPasswordService,
    MailService,
    UsersService,
    { provide: HashingService, useClass: BcryptService },
  ],
})
export class ResetPasswordModule {}
