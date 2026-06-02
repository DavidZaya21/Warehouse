import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  age?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Transform(({ value }) => normalizeDepartmentIds(value))
  @IsArray()
  @IsString({ each: true })
  departmentIds?: string[];
}

function normalizeDepartmentIds(value: unknown) {
  if (!value) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.map(String);
  }

  if (typeof value !== 'string') {
    return [String(value)];
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.map(String) : [value];
  } catch {
    return value
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);
  }
}
