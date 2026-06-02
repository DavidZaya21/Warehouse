import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { extname } from 'path';

@Injectable()
export class StorageService {
  private readonly bucket: string;
  private readonly publicUrl?: string;
  private readonly client: S3Client;

  constructor(private readonly config: ConfigService) {
    const accountId = this.required('R2_ACCOUNT_ID');
    this.bucket = this.required('R2_BUCKET');
    this.publicUrl = this.config.get<string>('R2_PUBLIC_URL');
    this.client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.required('R2_ACCESS_KEY_ID'),
        secretAccessKey: this.required('R2_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadImage(file: Express.Multer.File, folder: string) {
    const extension = extname(file.originalname) || '.jpg';
    const key = `${folder}/${randomUUID()}${extension}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return this.publicUrl
      ? `${this.publicUrl.replace(/\/$/, '')}/${key}`
      : key;
  }

  private required(name: string) {
    const value = this.config.get<string>(name);
    if (!value) {
      throw new Error(`${name} is required`);
    }
    return value;
  }
}
