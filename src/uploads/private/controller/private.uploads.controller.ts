import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PrivateService } from '../service/private.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseUploadDto } from '../../base/dto/baseUploadDto';
import { PrivateUploadDto } from '../dto/private.uploads.dto';
import { PrivateLinkDto } from '../dto/private.link.dto';
import { DeleteObjectDto } from '../dto/delete.object.dto';

@Controller('private')
export class PrivateUploadsController {
  constructor(private readonly uploadService: PrivateService) {}

  @Post('uploads')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 5000000000 } }),
  )
  async uploadPrivate(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: PrivateUploadDto,
  ) {
    try {
      await this.uploadService.uploadFile(file, uploadDto);
      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('delete/object')
  async deleteObject(@Body() deleteObjectDto: DeleteObjectDto) {
    try {
      await this.uploadService.deleteObject(deleteObjectDto);
      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('link')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 5000000000 } }),
  )
  async privateLink(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: PrivateUploadDto,
  ) {
    try {
      const url = await this.uploadService.generateLink(file, uploadDto);
      return { url: url };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('files/size/:minSize')
  async findByMinSize(@Param('minSize') minSize: number) {
    try {
      const files = await this.uploadService.findByMinSize(minSize);
      return files;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('files/email/:startingEmail')
  async findByEmailStartsWith(@Param('startingEmail') startingEmail: string) {
    try {
      const files = await this.uploadService.findByEmailStartsWith(
        startingEmail,
      );
      return files;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('files/filename/:startingFileName')
  async findByOriginalFileNameStartsWith(
    @Param('startingFileName') startingFileName: string,
  ) {
    const files = await this.uploadService.findByOriginalFileNameStartsWith(
      startingFileName,
    );

    if (!files || files.length === 0) {
      return null;
    }

    return files;
  }

  @Get('files')
  async getAllFiles(@Query('page') page = 1, @Query('limit') limit = 10) {
    const files = await this.uploadService.getAllFiles(page, limit);

    return files;
  }

  @Get('/:url')
  async getFileDetails(@Param('url') url: string) {
    try {
      const signedUrl = await this.uploadService.findByPrivateUrl(url);
      return { url: signedUrl };
    } catch (error) {
      throw new HttpException(
        'Failed to get file details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/usage/calculate/:id')
  async calculateStorage(@Param('id') id: number) {
    try {
      const storage = await this.uploadService.calculateTotalUsage(id);
      return { total: storage };
    } catch (error) {
      throw new HttpException(
        'Failed to get file details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
