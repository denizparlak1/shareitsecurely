import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Auth } from '../../iam/authentication/decorators/auth.decorator';
import { AuthType } from '../../iam/authentication/enums/auth-types.enum';
import { ResetPasswordService } from '../service/reset-password.service';
import { UsersService } from '../service/users.service';
import { UpdatePasswordDto } from '../dto/update.password.dto';

@Auth(AuthType.None)
@Controller('reset-password')
export class PasswordResetController {
  constructor(
    private readonly passwordResetService: ResetPasswordService,
    private readonly userService: UsersService,
  ) {}

  @Post('send')
  async sendResetPassword(@Body('email') email: string) {
    return await this.passwordResetService.sendResetPassword(email);
  }
  @Get('validate-token')
  async validateToken(@Query('token') token: string) {
    return await this.passwordResetService.validateResetToken(token);
  }

  @Patch('confirm/:id')
  async resetPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(+id, updatePasswordDto);
  }
}
