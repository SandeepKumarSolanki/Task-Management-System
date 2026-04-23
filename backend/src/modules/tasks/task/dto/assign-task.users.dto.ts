import { ArrayNotEmpty, IsArray, IsInt } from "class-validator";


export class AssignTaskToUsersDto {
    @IsInt()
    declare taskId: number;

    @IsArray()
    @ArrayNotEmpty()
    declare developerIds: number[];
}