import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private readonly config;
    private readonly bucket;
    private readonly publicUrl?;
    private readonly client;
    constructor(config: ConfigService);
    uploadImage(file: Express.Multer.File, folder: string): Promise<string>;
    private required;
    private requiredAny;
    private getEndpoint;
}
