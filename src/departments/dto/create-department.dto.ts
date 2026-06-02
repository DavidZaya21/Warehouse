import { Transform } from 'class-transformer';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  departmentName: string;

  @IsOptional()
  @Transform(({ value }) => parseRules(value))
  @IsObject()
  rules?: Record<string, unknown>;
}

function parseRules(value: unknown) {
  if (!value || typeof value !== 'string') {
    return value;
  }

  return JSON.parse(value) as Record<string, unknown>;
}
