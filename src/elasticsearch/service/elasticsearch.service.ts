import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { ElasticlogDto } from '../dto/elasticlog.dto';
@Injectable()
export class ElasticsearchService {
  private readonly esClient: Client;

  constructor(private configService: ConfigService) {
    this.esClient = new Client({
      node: this.configService.get<string>('ELASTICSEARCH_URL'),
      auth: {
        username: this.configService.get<string>('ELASTICSEARCH_USERNAME'),
        password: this.configService.get<string>('ELASTICSEARCH_PASSWORD'),
      },
    });

  }

  async logError(log: ElasticlogDto) {
    await this.esClient.index({
      index: 'applog',
      body: {
        timestamp: new Date().toISOString(),
        message: log.message,
        statusCode: log.status,
        path: log.url,
        method: log.method,
      },
    });
  }
}
