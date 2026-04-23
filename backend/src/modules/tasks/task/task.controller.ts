import { Body, Controller, Post, Req, UseGuards, Patch, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { ManagerGuard } from 'src/common/guards/manager.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AssignTaskDto } from './dto/assign-task.dto';
import { TeamLeaderGuard } from 'src/common/guards/teamleader.guard';
import { AssignTaskToUsersDto } from './dto/assign-task.users.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @UseGuards(JwtAuthGuard, ManagerGuard)
    @Roles('manager')
    @Post('create-task')
    async createTask(@Req() req, @Body() createTaskDto: CreateTaskDto) {
        const managerId = req.user.id;
        return this.taskService.createTask(managerId, createTaskDto);
    }

    @UseGuards(JwtAuthGuard, ManagerGuard)
    @Get('get-unassignedtasks')
    async getTasks(@Req() req) {
        const managerId = req.user.id;
        return this.taskService.getUnassignedTasks(managerId);
    }


    @UseGuards(JwtAuthGuard, ManagerGuard)
    @Patch('assign-to-tl')
    async assignTaskToTL(@Req() req, @Body() assignTaskDto: AssignTaskDto) {
        const managerId = req.user.id;
        return this.taskService.assignTaskToTL(managerId, assignTaskDto.tlId);
    }

    @UseGuards(JwtAuthGuard, TeamLeaderGuard)
    @Roles('team_leader')
    @Get('get-assgined-tasks')
    async getAssignedTasks(@Req() req) {
        const tlId = req.user.id;
        return this.taskService.getAssignedTasks(tlId);
    }

    @UseGuards(JwtAuthGuard, TeamLeaderGuard)
    @Roles('team_leader')
    @Patch('assign-task-to-users')
    async assignTaskToUsers(@Req() req, @Body() assignTaskDto: AssignTaskToUsersDto) {
        const tlId = req.user.id;
        return this.taskService.assignTaskUsers(tlId, assignTaskDto);
    }
}
