import { Module } from '@nestjs/common';
import { TaskStatusModule } from './task-status/task-status.module';
import { TaskModule } from './task/task.module';
import { TasksController } from './tasks.controller';
import { TaskAssignment } from './task_assignments.model';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { Task } from './task/task.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Task, TaskAssignment]),
    TaskStatusModule,
    TaskModule
  ],
  controllers: [TasksController],
  exports: [SequelizeModule]
  
})
export class TasksModule {}
