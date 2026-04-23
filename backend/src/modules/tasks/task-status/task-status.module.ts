import { Module } from '@nestjs/common';
import { TaskStatus } from './task-status.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([TaskStatus])
  ]
})
export class TaskStatusModule {}
