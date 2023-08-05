import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UpdateMailDto } from '../dto/update.mail.dto';
import { UpdatePasswordDto } from '../dto/update.password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('/update/email/:id')
  updateEmail(@Param('id') id: string, @Body() updateEmailDto: UpdateMailDto) {
    return this.usersService.updateEmail(+id, updateEmailDto);
  }

  @Patch('/update/passwd/:id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(+id, updatePasswordDto);
  }

  @Patch('/account/delete/:id')
  deleteAccount(@Param('id') id: string) {
    return this.usersService.updateAccountActivity(+id);
  }
}
