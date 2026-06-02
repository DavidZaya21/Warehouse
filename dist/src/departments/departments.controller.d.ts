import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentsService } from './departments.service';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
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
        rules: import("@prisma/client/runtime/client").JsonValue;
        imageUrl: string | null;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
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
        rules: import("@prisma/client/runtime/client").JsonValue;
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
        rules: import("@prisma/client/runtime/client").JsonValue;
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
        rules: import("@prisma/client/runtime/client").JsonValue;
        imageUrl: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        departmentName: string;
        rules: import("@prisma/client/runtime/client").JsonValue;
        imageUrl: string | null;
    }>;
}
