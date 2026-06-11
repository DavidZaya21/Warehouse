"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const path_1 = require("path");
let StorageService = class StorageService {
    constructor(config) {
        this.config = config;
        const endpoint = this.getEndpoint();
        this.bucket = this.requiredAny(['R2_BUCKET', 'R2_BUCKET_NAME']);
        this.publicUrl = this.config.get('R2_PUBLIC_URL');
        this.client = new client_s3_1.S3Client({
            region: 'auto',
            endpoint,
            credentials: {
                accessKeyId: this.required('R2_ACCESS_KEY_ID'),
                secretAccessKey: this.required('R2_SECRET_ACCESS_KEY'),
            },
        });
    }
    async uploadImage(file, folder) {
        const extension = (0, path_1.extname)(file.originalname) || '.jpg';
        const key = `${folder}/${(0, crypto_1.randomUUID)()}${extension}`;
        await this.client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        }));
        return this.publicUrl
            ? `${this.publicUrl.replace(/\/$/, '')}/${key}`
            : key;
    }
    async deleteImage(imageReference) {
        const key = this.getObjectKey(imageReference);
        if (!key) {
            return;
        }
        await this.client.send(new client_s3_1.DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key,
        }));
    }
    required(name) {
        const value = this.config.get(name);
        if (!value) {
            throw new Error(`${name} is required`);
        }
        return value;
    }
    requiredAny(names) {
        for (const name of names) {
            const value = this.config.get(name);
            if (value) {
                return value;
            }
        }
        throw new Error(`${names.join(' or ')} is required`);
    }
    getEndpoint() {
        const endpoint = this.config.get('R2_ENDPOINT');
        if (endpoint) {
            return endpoint;
        }
        const accountId = this.required('R2_ACCOUNT_ID');
        return `https://${accountId}.r2.cloudflarestorage.com`;
    }
    getObjectKey(imageReference) {
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
        }
        catch {
            return undefined;
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map