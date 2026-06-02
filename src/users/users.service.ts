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
        departments: dto.departmentIds?.length
          ? {
              create: dto.departmentIds.map((departmentId) => ({
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
    await this.findOne(id);

    const profileImage = file
      ? await this.storage.uploadImage(file, 'users')
      : undefined;

    return this.prisma.user.update({
      where: { id },
      data: {
        username: dto.username,
        email: dto.email,
        age: dto.age,
        location: dto.location,
        profileImage,
        departments: dto.departmentIds
          ? {
              deleteMany: {},
              create: dto.departmentIds.map((departmentId) => ({
                department: { connect: { id: departmentId } },
              })),
            }
          : undefined,
      },
      include: this.includeDepartments(),
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
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
}
