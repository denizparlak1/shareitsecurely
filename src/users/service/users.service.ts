import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateMailDto } from '../dto/update.mail.dto';
import { UpdatePasswordDto } from '../dto/update.password.dto';
import { HashingService } from '../../iam/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async updateEmail(
    id: number,
    updateMailDto: UpdateMailDto,
  ): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.email = updateMailDto.mail;
    await this.userRepository.save(user);

    return true;
  }

  async updatePassword(
    id: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.password = await this.hashingService.hash(updatePasswordDto.password);
    await this.userRepository.save(user);

    return true;
  }

  async updateAccountActivity(id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.is_active = false;
    await this.userRepository.save(user);

    return true;
  }
}
