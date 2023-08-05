import { Module } from '@nestjs/common';
import { PublicUploadsController } from '../controller/public.uploads.controller';
import { PublicUploadsService } from '../service/public-uploads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Uploads } from '../entity/upload.entity';
import { GcsModule } from '../../../gcs/gcs.module';
import { MailModule } from '../../../mail/mail.module';
import { BaseUploadService } from '../../base/base-upload/base-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Uploads]), GcsModule, MailModule],
  controllers: [PublicUploadsController],
  providers: [PublicUploadsService],
  exports: [PublicUploadsService],
})
export class PublicUploadsModule {}
