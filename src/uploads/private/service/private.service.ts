import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseUploadService } from '../../base/base-upload/base-upload.service';
import { PrivateUploadEntity } from '../entity/private.upload.entity';
import { PrivateUploadDto } from '../dto/private.uploads.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, ILike, MoreThan, Repository } from 'typeorm';
import { GcsService } from '../../../gcs/gcs.service';
import { MailService } from '../../../mail/mail.service';
import { PrivateLinkDto } from '../dto/private.link.dto';
import * as path from 'path';
import { equals } from 'class-validator';
import { DeleteObjectDto } from '../dto/delete.object.dto';

@Injectable()
export class PrivateService extends BaseUploadService<
  PrivateUploadEntity,
  PrivateUploadDto
> {
  constructor(
    @InjectRepository(PrivateUploadEntity)
    protected readonly repository: Repository<PrivateUploadEntity>,
    protected readonly gcsService: GcsService,
    protected readonly emailService: MailService,
  ) {
    super(repository, gcsService, emailService);
  }
  async uploadFile(
    file: Express.Multer.File,
    uploadDto: PrivateUploadDto,
  ): Promise<void> {
    const { fileUrl, uploaded_file_name } = await this.gcsService.uploadFile(
      file,
    );
    const signedUrl = await this.gcsService.generateSignedUrl(
      fileUrl,
      uploadDto.ttl,
    );

    uploadDto.url = fileUrl;
    uploadDto.original_file_name = file.originalname;
    uploadDto.size = Number(file.size);
    uploadDto.ttl = Number(uploadDto.ttl);
    uploadDto.user_id = Number(uploadDto.user_id);
    uploadDto.uploaded_file_name = uploaded_file_name;
    uploadDto.is_deleted = false;

    await super.create(uploadDto);

    await this.emailService.sendPublicShareLink(uploadDto.email, signedUrl);
  }

  async generateLink(
    file: Express.Multer.File,
    uploadDto: PrivateUploadDto,
  ): Promise<string> {
    const { fileUrl, uploaded_file_name } = await this.gcsService.uploadFile(
      file,
    );
    const fileName = path.basename(fileUrl);

    const signedUrl = await this.gcsService.generateSignedUrl(
      fileName,
      uploadDto.ttl,
    );

    uploadDto.url = fileUrl;
    uploadDto.original_file_name = file.originalname;
    uploadDto.size = Number(file.size);
    uploadDto.ttl = Number(uploadDto.ttl);
    uploadDto.user_id = Number(uploadDto.user_id);
    uploadDto.uploaded_file_name = uploaded_file_name;
    uploadDto.is_deleted = false;

    await super.create(uploadDto);

    return signedUrl;
  }

  async deleteObject(deleteObject: DeleteObjectDto) {
    try {
      const file = await this.repository.findOne({
        where: {
          user_id: deleteObject.user_id,
          original_file_name: deleteObject.original_file_name,
        },
      });
      if (!file) {
        throw new NotFoundException('File not found in the database.');
      }
      await this.gcsService.deleteObject(file.uploaded_file_name);

      file.is_deleted = true;
      await this.repository.save(file);
      return true;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByMinSize(minSize: number) {
    const files = await this.repository.find({
      where: {
        size: MoreThan(minSize),
      },
    });

    if (!files || files.length === 0) {
      throw new HttpException(
        'No files found with minimum size',
        HttpStatus.NOT_FOUND,
      );
    }

    return files;
  }

  async findByEmailStartsWith(
    startingEmail: string,
  ): Promise<PrivateUploadEntity[]> {
    const files = await this.repository.find({
      where: {
        email: ILike(`${startingEmail}%`),
      },
    });

    return files;
  }
  async findByOriginalFileNameStartsWith(
    startingFileName: string,
  ): Promise<PrivateUploadEntity[]> {
    const files = await this.repository.find({
      where: {
        original_file_name: ILike(`${startingFileName}%`),
      },
    });

    return files;
  }

  async findByPrivateUrl(url: string): Promise<string> {
    try {
      const file = await this.repository.findOne({
        where: {
          url: Equal(url),
        },
        select: ['url', 'ttl'],
      });

      if (!file) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }

      const urlParts = file.url.split('/');
      const blobName = urlParts[urlParts.length - 1];

      const signedUrl = await this.gcsService.generateSignedUrl(
        blobName,
        file.ttl,
      );
      return signedUrl;
    } catch (error) {
      throw new HttpException(
        'Failed to generate signed URL',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllFiles(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const files = await this.repository.find({
      where: {
        is_deleted: false,
      },
      skip,
      take: limit,
      order: {
        id: 'DESC',
      },
      select: ['id', 'url', 'email', 'original_file_name', 'size'],
    });

    return files;
  }

  async calculateTotalUsage(userId: number) {
    const files = await this.repository.find({ where: { user_id: userId } });

    let totalSizeInBytes = 0;
    files.forEach((file) => {
      totalSizeInBytes += file.size;
    });

    const totalSizeInGB = totalSizeInBytes / (1024 * 1024 * 1024);
    const usagePercentage = ((totalSizeInGB / 100) * 100).toFixed(2);
    return usagePercentage;
  }
}
