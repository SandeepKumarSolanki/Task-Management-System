import { IsNumber, IsOptional, IsInt, IsBoolean, IsString, ValidateIf, IsIn } from "class-validator";

export class AssignUserDto {

    @IsInt()
    role_id!: number;

    @IsOptional()
    @IsNumber()
    department_id?: number | null;

    @IsOptional()
    @IsNumber()
    designation_id?: number | null;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsOptional()
    @IsString()
    admin_confirmation?: string;
}