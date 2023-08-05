import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GcsService {
  private readonly bucketName: string;
  private readonly storage: Storage;

  constructor(private configService: ConfigService) {
    this.bucketName = configService.get('GCS_BUCKET_NAME');
    this.storage = new Storage({
      keyFilename: configService.get('GCS_KEY_FILENAME'),
    });
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<{ fileUrl: string; uploaded_file_name: string }> {
    const uniqueId = Math.random().toString(36).substring(7);
    const fileExtension = file.originalname.split('.').pop();
    const destinationFileName = `${uniqueId}.${fileExtension}`;

    const bucket = this.storage.bucket(this.bucketName);
    const stream = bucket.file(destinationFileName).createWriteStream();

    return new Promise((resolve, reject) => {
      stream.on('error', (err) => {
        console.log(err);
        reject(
          new HttpException(
            'The file could not be uploaded, check it GCS',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      });

      stream.on('finish', () => {
        const fileUrl = `https://storage.googleapis.com/${this.bucketName}/${destinationFileName}`;
        const uploaded_file_name = destinationFileName;
        resolve({ fileUrl, uploaded_file_name });
      });
      stream.end(file.buffer);
    });
  }

  async generateSignedUrl(
    blobName: string,
    expiration: number,
  ): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(blobName);

    const [url] = await blob.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + expiration * 1000,
    });

    return url;
  }

  async deleteObject(fileName: string) {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      await bucket.file(fileName).delete();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
