import { Module } from '@nestjs/common';
import { GcsService } from './gcs.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [GcsService],
  exports: [GcsService],
})
export class GcsModule {}
