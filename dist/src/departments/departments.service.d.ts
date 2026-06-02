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
                createdAt: Date;
                updatedAt: Date;
                username: string;
                email: string;
                profileImage: string | null;
                age: number | null;
                location: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            departmentId: string;
        })[];
    } & {
        id: string;
        departmentName: string;
        rules: Prisma.JsonValue;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Prisma.PrismaPromise<({
        users: ({
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                username: string;
                email: string;
                profileImage: string | null;
                age: number | null;
                location: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            departmentId: string;
        })[];
    } & {
        id: string;
        departmentName: string;
        rules: Prisma.JsonValue;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        users: ({
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                username: string;
                email: string;
                profileImage: string | null;
                age: number | null;
                location: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            departmentId: string;
        })[];
    } & {
        id: string;
        departmentName: string;
        rules: Prisma.JsonValue;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateDepartmentDto, file?: Express.Multer.File): Promise<{
        users: ({
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                username: string;
                email: string;
                profileImage: string | null;
                age: number | null;
                location: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            departmentId: string;
        })[];
    } & {
        id: string;
        departmentName: string;
        rules: Prisma.JsonValue;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        departmentName: string;
        rules: Prisma.JsonValue;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private includeUsers;
}
