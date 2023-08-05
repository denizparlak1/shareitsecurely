import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicUploadsModule } from './uploads/public/modules/public.uploads.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ElasticsearchModule } from './elasticsearch/module/elasticsearch.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './users/module/users.module';
import { IamModule } from './iam/iam.module';
import { PublicUploadsController } from './uploads/public/controller/public.uploads.controller';
import { PrivateService } from './uploads/private/service/private.service';
import { PrivateUploadsController } from './uploads/private/controller/private.uploads.controller';
import { PrivateUploadsModule } from './uploads/private/modules/private.uploads.module';
import { User } from './users/entities/user/user.entity';
import { PasswordReset } from './users/entities/reset-password/password.reset.entity';
import { PasswordResetController } from "./users/controller/reset-password.controller";
import { ResetPasswordModule } from "./users/module/reset-password.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PublicUploadsModule,
    PrivateUploadsModule,
    ElasticsearchModule,
    TypeOrmModule.forFeature([User, PasswordReset]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60, // time to live in seconds
      limit: 10, // limit to X amount of requests
    }),
    UsersModule,
    IamModule,
    ResetPasswordModule,
  ],
  controllers: [
    AppController,
    PublicUploadsController,
    PrivateUploadsController,
  ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
