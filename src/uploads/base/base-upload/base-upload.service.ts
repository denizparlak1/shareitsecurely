import { Repository, DeepPartial } from 'typeorm';
import { GcsService } from '../../../gcs/gcs.service';
import { MailService } from '../../../mail/mail.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseUploadService<
  Entity,
  DTO extends DeepPartial<Entity>,
> {
  constructor(
    protected readonly repository: Repository<Entity>,
    protected readonly gcsService: GcsService,
    protected readonly emailService: MailService,
  ) {}

  async create(uploadDto: DTO) {
    try {
      const upload = this.repository.create(uploadDto);
      return this.repository.save(upload);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  abstract uploadFile(file: Express.Multer.File, uploadDto: DTO): Promise<void>;
}
