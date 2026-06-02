import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
export declare class DepartmentsService {
    private readonly prisma;
    private readonly storage;
    constructor(prisma: PrismaService, storage: StorageService);
    create(dto: CreateDepartmentDto, file?: Express.Multer.File): Promise<{
        users: ({
            user: {
                id: string;
                username: string;
                email: string;
                profileImage: string | null;
                age: number | null;
                location: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            departmentId: string;
            userId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentName: string;
        rules: Prisma.JsonValue;
        imageUrl: string | null;
    }>;
    findAll(): Prisma.PrismaPromise<({
        users: ({
            user: {
                id: string;
                username: string;
                email: string;
                profileImage: string | null;
                age: number | null;
                location: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            departmentId: string;
            userId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentName: string;
        rules: Prisma.JsonValue;
        imageUrl: string | null;
    })[]>;
    findOne(id: string): Promise<{
        users: ({
            user: {
                id: string;
                username: string;
                email: string;
                profileImage: string | null;
                age: number | null;
                location: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            departmentId: string;
            userId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentName: string;
        rules: Prisma.JsonValue;
        imageUrl: string | null;
    }>;
    update(id: string, dto: UpdateDepartmentDto, file?: Express.Multer.File): Promise<{
        users: ({
            user: {
                id: string;
                username: string;
                email: string;
                profileImage: string | null;
                age: number | null;
                location: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            departmentId: string;
            userId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentName: string;
        rules: Prisma.JsonValue;
        imageUrl: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentName: string;
        rules: Prisma.JsonValue;
        imageUrl: string | null;
    }>;
    private includeUsers;
}
