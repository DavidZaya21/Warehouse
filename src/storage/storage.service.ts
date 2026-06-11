import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
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
    const endpoint = this.getEndpoint();
    this.bucket = this.requiredAny(['R2_BUCKET', 'R2_BUCKET_NAME']);
    this.publicUrl = this.config.get<string>('R2_PUBLIC_URL');
    this.client = new S3Client({
      region: 'auto',
      endpoint,
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

  async deleteImage(imageReference?: string | null) {
    const key = this.getObjectKey(imageReference);
    if (!key) {
      return;
    }

    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }

  private required(name: string) {
    const value = this.config.get<string>(name);
    if (!value) {
      throw new Error(`${name} is required`);
    }
    return value;
  }

  private requiredAny(names: string[]) {
    for (const name of names) {
      const value = this.config.get<string>(name);
      if (value) {
        return value;
      }
    }

    throw new Error(`${names.join(' or ')} is required`);
  }

  private getEndpoint() {
    const endpoint = this.config.get<string>('R2_ENDPOINT');
    if (endpoint) {
      return endpoint;
    }

    const accountId = this.required('R2_ACCOUNT_ID');
    return `https://${accountId}.r2.cloudflarestorage.com`;
  }

  private getObjectKey(imageReference?: string | null) {
    if (!imageReference) {
      return undefined;
    }

    if (!imageReference.startsWith('http')) {
      return imageReference.replace(/^\/+/, '');
    }

    if (this.publicUrl) {
      const baseUrl = this.publicUrl.replace(/\/$/, '');
      if (imageReference.startsWith(`${baseUrl}/`)) {
        return imageReference.slice(baseUrl.length + 1);
      }
    }

    try {
      const url = new URL(imageReference);
      return url.pathname.replace(/^\/+/, '');
    } catch {
      return undefined;
    }
  }
}
