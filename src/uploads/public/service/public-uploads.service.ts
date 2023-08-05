import { Repository } from 'typeorm';
import { GcsService } from '../../../gcs/gcs.service';
import { MailService } from '../../../mail/mail.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseUploadService } from '../../base/base-upload/base-upload.service';
import { Uploads } from '../entity/upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseUploadDto } from '../../base/dto/baseUploadDto';
import { InfoDto } from '../dto/info.dto';
import { UploadDto } from '../dto/UploadDto';

@Injectable()
export class PublicUploadsService extends BaseUploadService<
  Uploads,
  BaseUploadDto
> {
  constructor(
    @InjectRepository(Uploads)
    protected readonly repository: Repository<Uploads>,
    protected readonly gcsService: GcsService,
    protected readonly emailService: MailService,
  ) {
    super(repository, gcsService, emailService);
  }

  async uploadFile(
    file: Express.Multer.File,
    uploadDto: UploadDto,
  ): Promise<void> {
    const { fileUrl, uploaded_file_name } = await this.gcsService.uploadFile(
      file,
    );
    const signedUrl = await this.gcsService.generateSignedUrl(fileUrl, 3600);

    uploadDto.url = fileUrl;
    uploadDto.original_file_name = file.originalname;
    uploadDto.uploaded_file_name = uploaded_file_name;
    await super.create(uploadDto);

    await this.emailService.sendPublicShareLink(uploadDto.email, signedUrl);
  }

  async publicSendInfoMailService(infoDto: InfoDto) {
    return await this.emailService.sendInfoMail(infoDto);
  }
}
