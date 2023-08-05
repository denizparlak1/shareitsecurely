import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordReset } from '../entities/reset-password/password.reset.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(PasswordReset)
    private readonly resetPasswordRepository: Repository<PasswordReset>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async sendResetPassword(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email: email });

      if (!user) {
        throw new NotFoundException('E-mail address not found.');
      }

      const token = uuidv4();

      const passwordReset = new PasswordReset();
      passwordReset.token = token;
      passwordReset.user = user;
      passwordReset.created_at = new Date();

      await this.resetPasswordRepository.save(passwordReset);

      const resetLink = `http://localhost:3000/reset-password?token=${token}`;
      console.log(resetLink);

      await this.mailService.sendPasswordResetMail(email, resetLink);

      return true;
    } catch (error) {
      throw new HttpException(
        'Failed to send reset password email.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async validateResetToken(
    token: string,
  ): Promise<{ valid: boolean; user_id?: number }> {
    const passwordReset = await this.resetPasswordRepository.findOne({
      where: { token: token },
      relations: ['user'],
    });
    console.log(token);

    if (!passwordReset) {
      return { valid: false };
    }

    const now = new Date();
    const expirationTime = new Date(passwordReset.completed_at);

    if (now > expirationTime) {
      return { valid: false };
    }

    return { valid: true, user_id: passwordReset.user.id };
  }
}
