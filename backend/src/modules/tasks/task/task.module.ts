import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Task } from './task.model';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { User } from 'src/modules/employees/users/users.model';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { TaskAssignment } from '../task_assignments.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Task, User, TaskAssignment]),
    TaskModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
  
})
export class TaskModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes('task')
  }
}
