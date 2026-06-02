import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    private readonly storage;
    constructor(prisma: PrismaService, storage: StorageService);
    create(dto: CreateUserDto, file?: Express.Multer.File): Promise<{
        departments: ({
            department: {
                id: string;
                departmentName: string;
                rules: import("@prisma/client/runtime/client").JsonValue;
                imageUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            departmentId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        profileImage: string | null;
        age: number | null;
        location: string | null;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        departments: ({
            department: {
                id: string;
                departmentName: string;
                rules: import("@prisma/client/runtime/client").JsonValue;
                imageUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            departmentId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        profileImage: string | null;
        age: number | null;
        location: string | null;
    })[]>;
    findOne(id: string): Promise<{
        departments: ({
            department: {
                id: string;
                departmentName: string;
                rules: import("@prisma/client/runtime/client").JsonValue;
                imageUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            departmentId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        profileImage: string | null;
        age: number | null;
        location: string | null;
    }>;
    update(id: string, dto: UpdateUserDto, file?: Express.Multer.File): Promise<{
        departments: ({
            department: {
                id: string;
                departmentName: string;
                rules: import("@prisma/client/runtime/client").JsonValue;
                imageUrl: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            departmentId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        profileImage: string | null;
        age: number | null;
        location: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        username: string;
        email: string;
        profileImage: string | null;
        age: number | null;
        location: string | null;
    }>;
    addDepartment(userId: string, departmentId: string): Promise<{
        department: {
            id: string;
            departmentName: string;
            rules: import("@prisma/client/runtime/client").JsonValue;
            imageUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
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
    }>;
    removeDepartment(userId: string, departmentId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        departmentId: string;
    }>;
    private includeDepartments;
}
