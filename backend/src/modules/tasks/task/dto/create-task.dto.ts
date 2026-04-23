import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateTaskDto {

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  status_id?: number;

  @IsOptional()
  @IsDateString()
  due_date?: string;
}