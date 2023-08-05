import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ElasticsearchService } from '../../../elasticsearch/service/elasticsearch.service';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  constructor(
    @Inject(ElasticsearchService)
    private readonly elasticService: ElasticsearchService,
  ) {}

  async catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    await this.elasticService.logError({
      message: exception.message,
      status: status,
      url: request.url,
      method: request.method,
    });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      details: errorResponse
    });
  }
}
