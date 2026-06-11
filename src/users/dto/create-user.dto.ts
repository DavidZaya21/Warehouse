import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => emptyStringToUndefined(value))
  @IsString()
  username: string;

  @Transform(({ value }) => emptyStringToUndefined(value))
  @IsEmail()
  email: string;

  @IsOptional()
  @Transform(({ value }) => optionalNumber(value))
  @IsInt()
  @Min(0)
  age?: number;

  @IsOptional()
  @Transform(({ value }) => emptyStringToUndefined(value))
  @IsString()
  location?: string;

  @IsOptional()
  @Transform(({ value }) => normalizeStringList(value))
  @IsArray()
  @IsString({ each: true })
  departmentNames?: string[];
}

function emptyStringToUndefined(value: unknown) {
  return value === '' ? undefined : value;
}

function optionalNumber(value: unknown) {
  if (value === '' || value === undefined || value === null) {
    return undefined;
  }

  return Number(value);
}

function normalizeStringList(value: unknown) {
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
      .map((item) => item.trim())
      .filter(Boolean);
  }
}
