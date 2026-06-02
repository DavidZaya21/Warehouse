import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  async create(dto: CreateDepartmentDto, file?: Express.Multer.File) {
    const imageUrl = file
      ? await this.storage.uploadImage(file, 'departments')
      : undefined;

    return this.prisma.department.create({
      data: {
        departmentName: dto.departmentName,
        rules: (dto.rules ?? {}) as Prisma.InputJsonValue,
        imageUrl,
      },
      include: this.includeUsers(),
    });
  }

  findAll() {
    return this.prisma.department.findMany({
      orderBy: { createdAt: 'desc' },
      include: this.includeUsers(),
    });
  }

  async findOne(id: string) {
    const department = await this.prisma.department.findUnique({
      where: { id },
      include: this.includeUsers(),
    });

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    return department;
  }

  async update(
    id: string,
    dto: UpdateDepartmentDto,
    file?: Express.Multer.File,
  ) {
    await this.findOne(id);

    const imageUrl = file
      ? await this.storage.uploadImage(file, 'departments')
      : undefined;

    return this.prisma.department.update({
      where: { id },
      data: {
        departmentName: dto.departmentName,
        rules: dto.rules as Prisma.InputJsonValue | undefined,
        imageUrl,
      },
      include: this.includeUsers(),
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.department.delete({ where: { id } });
  }

  private includeUsers() {
    return {
      users: {
        include: {
          user: true,
        },
      },
    };
  }
}
