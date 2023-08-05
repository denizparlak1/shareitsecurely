import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client as PostmarkClient } from 'postmark';
import { InfoDto } from '../uploads/public/dto/info.dto';

@Injectable()
export class MailService {
  private readonly postmarkClient: PostmarkClient;

  constructor(private readonly configService: ConfigService) {
    const postmarkServerToken = configService.get('POSTMARK_SERVER_TOKEN');
    this.postmarkClient = new PostmarkClient(postmarkServerToken);
  }

  async sendPublicShareLink(address: string, signedUrl: string) {
    const templateVariables = {
      message: signedUrl,
      subject: 'There is a message from Safe Sharing 🚀',
    };

    const templateId = this.configService.get('SHARE_LINK_TEMPLATE_ID');

    try {
      await this.postmarkClient.sendEmailWithTemplate({
        From: 'info@safesharing.net',
        To: address,
        TemplateId: templateId,
        TemplateModel: templateVariables,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async sendInfoMail(infoDto: InfoDto) {
    const templateVariables = {
      firstname: infoDto.firstname,
      lastname: infoDto.lastname,
      email: infoDto.mail,
      phone: infoDto.phone,
      message: infoDto.message,
      subject: 'Info Mail 🚀',
    };
    const templateId = this.configService.get('INFO_MAIL_TEMPLATE_ID');

    try {
      await this.postmarkClient.sendEmailWithTemplate({
        From: 'noreply@safesharing.net',
        To: 'info@safesharing.net',
        TemplateId: templateId,
        TemplateModel: templateVariables,
      });
      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
  async sendPasswordResetMail(adress: string, resetLink: string) {
    const templateVariables = {
      resetLink: resetLink,
    };
    const templateId = this.configService.get('PASSWORD_RESET_TEMPLATE_ID');

    try {
      await this.postmarkClient.sendEmailWithTemplate({
        From: 'noreply@safesharing.net',
        To: adress,
        TemplateId: templateId,
        TemplateModel: templateVariables,
      });
      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
