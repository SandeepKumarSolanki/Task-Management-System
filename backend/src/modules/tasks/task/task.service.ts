import {
  NotFoundException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { User } from 'src/modules/employees/users/users.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { Op } from 'sequelize';
import { TaskAssignment } from '../task_assignments.model';
import { AssignTaskToUsersDto } from './dto/assign-task.users.dto';
import { Optional } from 'sequelize';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,

    @InjectModel(TaskAssignment)
    private taskAssignmentModel: typeof TaskAssignment,

    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createTask(managerId: number, createTaskDto: CreateTaskDto) {
    console.log(createTaskDto);

    const task = await this.taskModel.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      created_by: managerId,
      assigned_tl: null,

      status_id: createTaskDto.status_id ?? 1,
      due_date: createTaskDto.due_date
        ? new Date(createTaskDto.due_date)
        : null,
    } as any);

    return {
      message: 'Task created successfuly',
      data: task,
    };
  }

  async getUnassignedTasks(managerId: number) {
    return this.taskModel.findAll({
      where: {
        created_by: managerId,
        status_id: 1,
      },
    });
  }

  async assignTaskToTL(managerId: number, tlId: number) {
    const [updatedRows] = await this.taskModel.update(
      {
        assigned_tl: tlId,
        status_id: 2,
      },
      {
        where: {
          created_by: managerId,
          status_id: 1,
          assigned_tl: null,
        },
      },
    );

    if (!updatedRows) {
      throw new NotFoundException('No task available');
    }

    return {
      message: 'Task assigned to Team Leader successfully',
    };
    // const task = await this.taskModel.findOne({
    //   where: {
    //     created_by: managerId,
    //     status_id: 1,
    //     assigned_tl: null,
    //   },
    // });

    // if (!task) {
    //   throw new NotFoundException('No task available');
    // }

    // task.assigned_tl = tlId;
    // task.status_id = 2;
    // await task.save();
    // return task;
  }

  async getAssignedTasks(tlId: number) {
    const tasks = await this.taskModel.findAll({
      where: {
        assigned_tl: tlId,
      },
    });
    return tasks;
  }

  async assignTaskUsers(tlId: number, dto: AssignTaskToUsersDto) {
    const { taskId, developerIds } = dto;
    const task = await this.taskModel.findByPk(taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }
    console.log("Assigned task to Users",task?.assigned_tl, tlId);
    if (task.assigned_tl !== tlId) {
      throw new ForbiddenException(
        'You are not authorized to assign users to this task',
      );
    }

    const assignments = developerIds.map((devId) => ({
      task_id: taskId,
      developer_id: devId,
      assigned_by: tlId,
      assigned_at: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await this.taskAssignmentModel.bulkCreate(assignments as any);
    task.status_id = 2;
    await task.save();
    return {
      message: 'Task assigned to developers successfully',
    };
  }
}
