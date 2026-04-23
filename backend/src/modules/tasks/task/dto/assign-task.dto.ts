import { IsNumber } from "class-validator";


export class AssignTaskDto {
    @IsNumber()
    declare tlId: number;
}

