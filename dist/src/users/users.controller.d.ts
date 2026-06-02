import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto, file?: Express.Multer.File): Promise<{
        departments: ({
            department: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                departmentName: string;
                rules: import("@prisma/client/runtime/client").JsonValue;
                imageUrl: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            departmentId: string;
            userId: string;
        })[];
    } & {
        id: string;
        username: string;
        email: string;
        profileImage: string | null;
        age: number | null;
        location: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        departments: ({
            department: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                departmentName: string;
                rules: import("@prisma/client/runtime/client").JsonValue;
                imageUrl: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            departmentId: string;
            userId: string;
        })[];
    } & {
        id: string;
        username: string;
        email: string;
        profileImage: string | null;
        age: number | null;
        location: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        departments: ({
            department: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                departmentName: string;
                rules: import("@prisma/client/runtime/client").JsonValue;
                imageUrl: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            departmentId: string;
            userId: string;
        })[];
    } & {
        id: string;
        username: string;
        email: string;
        profileImage: string | null;
        age: number | null;
        location: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateUserDto, file?: Express.Multer.File): Promise<{
        departments: ({
            department: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                departmentName: string;
                rules: import("@prisma/client/runtime/client").JsonValue;
                imageUrl: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            departmentId: string;
            userId: string;
        })[];
    } & {
        id: string;
        username: string;
        email: string;
        profileImage: string | null;
        age: number | null;
        location: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        username: string;
        email: string;
        profileImage: string | null;
        age: number | null;
        location: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addDepartment(id: string, departmentId: string): Promise<{
        department: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            departmentName: string;
            rules: import("@prisma/client/runtime/client").JsonValue;
            imageUrl: string | null;
        };
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
    }>;
    removeDepartment(id: string, departmentId: string): Promise<{
        id: string;
        createdAt: Date;
        departmentId: string;
        userId: string;
    }>;
}
