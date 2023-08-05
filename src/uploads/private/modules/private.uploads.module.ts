import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GcsModule } from '../../../gcs/gcs.module';
import { MailModule } from '../../../mail/mail.module';
import { PrivateUploadEntity } from '../entity/private.upload.entity';
import { PrivateService } from '../service/private.service';
import { BaseUploadService } from '../../base/base-upload/base-upload.service';
import { PrivateUploadsController } from '../controller/private.uploads.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([PrivateUploadEntity]),
    GcsModule,
    MailModule,
  ],
  controllers: [PrivateUploadsController],
  providers: [PrivateService],
  exports: [PrivateService],
})
export class PrivateUploadsModule {}
