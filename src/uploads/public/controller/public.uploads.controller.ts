import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors, UsePipes, ValidationPipe
} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicUploadsService } from '../service/public-uploads.service';
import { Throttle } from '@nestjs/throttler';
import { Auth } from '../../../iam/authentication/decorators/auth.decorator';
import { AuthType } from '../../../iam/authentication/enums/auth-types.enum';
import { BaseUploadDto } from '../../base/dto/baseUploadDto';
import { InfoDto } from '../dto/info.dto';
import { MailService } from '../../../mail/mail.service';

@Auth(AuthType.None)
@Controller('public')
export class PublicUploadsController {
  constructor(private readonly uploadService: PublicUploadsService) {}

  @Post('uploads')
  @Throttle(10, 300)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10000000 } }))
  async uploadPublic(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: BaseUploadDto,
  ) {
    try {
      await this.uploadService.uploadFile(file, uploadDto);
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('info')
  @Throttle(10, 300)
  async getInTouch(@Body() infoDto: InfoDto) {
    try {
      return await this.uploadService.publicSendInfoMailService(infoDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
