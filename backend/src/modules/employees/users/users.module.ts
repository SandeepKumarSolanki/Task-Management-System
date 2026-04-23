import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { User } from './users.model';
import { Department } from 'src/modules/organization/departments/departments.model';
import { Role } from 'src/modules/organization/roles/roles.model';
import { Designation } from 'src/modules/organization/designations/designations.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { TaskModule } from 'src/modules/tasks/task/task.module';
import { Task } from 'src/modules/tasks/task/task.model';
import { TaskAssignment } from 'src/modules/tasks/task_assignments.model';

@Module({
  imports: [
    SequelizeModule.forFeature(
      [
        User, 
        Department, 
        Role, 
        Designation, 
        Task, 
        TaskAssignment
      ]
    ),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRES'),
        }
      })
    })
  ],

  exports: [SequelizeModule],
  controllers: [UsersController],
  providers: [UsersService]
  
})
export class UsersModule {}
