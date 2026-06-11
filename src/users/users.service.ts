import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  async create(dto: CreateUserDto, file?: Express.Multer.File) {
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

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: this.includeDepartments(),
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, dto: UpdateUserDto, file?: Express.Multer.File) {
    const existingUser = await this.findOne(id);

    const departmentIds = await this.resolveDepartmentIds(dto);
    const shouldUpdateDepartments =
      dto.departmentNames !== undefined;

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

  async remove(id: string) {
    const existingUser = await this.findOne(id);
    const deletedUser = await this.prisma.user.delete({ where: { id } });

    await this.storage.deleteImage(existingUser.profileImage);

    return deletedUser;
  }

  async addDepartment(userId: string, departmentId: string) {
    await this.findOne(userId);

    return this.prisma.userDepartment.upsert({
      where: { userId_departmentId: { userId, departmentId } },
      update: {},
      create: { userId, departmentId },
      include: { user: true, department: true },
    });
  }

  async removeDepartment(userId: string, departmentId: string) {
    await this.findOne(userId);

    return this.prisma.userDepartment.delete({
      where: { userId_departmentId: { userId, departmentId } },
    });
  }

  private includeDepartments() {
    return {
      departments: {
        include: {
          department: true,
        },
      },
    };
  }

  private async resolveDepartmentIds(dto: CreateUserDto | UpdateUserDto) {
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

    const foundNames = new Set(
      departments.map((department) => department.departmentName),
    );
    const missingNames = departmentNames.filter((name) => !foundNames.has(name));

    if (missingNames.length) {
      throw new NotFoundException(
        `Department not found: ${missingNames.join(', ')}`,
      );
    }

    return [...new Set(departments.map((department) => department.id))];
  }
}
