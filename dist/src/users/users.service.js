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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const storage_service_1 = require("../storage/storage.service");
let UsersService = class UsersService {
    constructor(prisma, storage) {
        this.prisma = prisma;
        this.storage = storage;
    }
    async create(dto, file) {
        const departmentIds = await this.resolveDepartmentIds(dto);
        const profileImage = file
            ? await this.storage.uploadImage(file, 'users')
            : undefined;
        return this.prisma.user.create({
            data: {
                username: dto.username,
                email: dto.email,
                age: dto.age,
                location: dto.location,
                profileImage,
                departments: departmentIds.length
                    ? {
                        create: departmentIds.map((departmentId) => ({
                            department: { connect: { id: departmentId } },
                        })),
                    }
                    : undefined,
            },
            include: this.includeDepartments(),
        });
    }
    findAll() {
        return this.prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            include: this.includeDepartments(),
        });
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: this.includeDepartments(),
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(id, dto, file) {
        const existingUser = await this.findOne(id);
        const departmentIds = await this.resolveDepartmentIds(dto);
        const shouldUpdateDepartments = dto.departmentNames !== undefined;
        const profileImage = file
            ? await this.storage.uploadImage(file, 'users')
            : undefined;
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                username: dto.username,
                email: dto.email,
                age: dto.age,
                location: dto.location,
                profileImage,
                departments: shouldUpdateDepartments
                    ? {
                        deleteMany: {},
                        create: departmentIds.map((departmentId) => ({
                            department: { connect: { id: departmentId } },
                        })),
                    }
                    : undefined,
            },
            include: this.includeDepartments(),
        });
        if (file) {
            await this.storage.deleteImage(existingUser.profileImage);
        }
        return updatedUser;
    }
    async remove(id) {
        const existingUser = await this.findOne(id);
        const deletedUser = await this.prisma.user.delete({ where: { id } });
        await this.storage.deleteImage(existingUser.profileImage);
        return deletedUser;
    }
    async addDepartment(userId, departmentId) {
        await this.findOne(userId);
        return this.prisma.userDepartment.upsert({
            where: { userId_departmentId: { userId, departmentId } },
            update: {},
            create: { userId, departmentId },
            include: { user: true, department: true },
        });
    }
    async removeDepartment(userId, departmentId) {
        await this.findOne(userId);
        return this.prisma.userDepartment.delete({
            where: { userId_departmentId: { userId, departmentId } },
        });
    }
    includeDepartments() {
        return {
            departments: {
                include: {
                    department: true,
                },
            },
        };
    }
    async resolveDepartmentIds(dto) {
        const departmentNames = dto.departmentNames ?? [];
        if (!departmentNames.length) {
            return [];
        }
        const departments = await this.prisma.department.findMany({
            where: {
                departmentName: { in: departmentNames },
            },
            select: {
                id: true,
                departmentName: true,
            },
        });
        const foundNames = new Set(departments.map((department) => department.departmentName));
        const missingNames = departmentNames.filter((name) => !foundNames.has(name));
        if (missingNames.length) {
            throw new common_1.NotFoundException(`Department not found: ${missingNames.join(', ')}`);
        }
        return [...new Set(departments.map((department) => department.id))];
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        storage_service_1.StorageService])
], UsersService);
//# sourceMappingURL=users.service.js.map