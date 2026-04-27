import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../employees/users/users.model';
import { Role } from '../organization/roles/roles.model';
import { Department } from '../organization/departments/departments.model';
import { Designation } from '../organization/designations/designations.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { Task } from '../tasks/task/task.model';
import { EmployeeHistoryModule } from '../employees/employee-history/employee-history.module';


@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, Department, Designation,Task]),
    EmployeeHistoryModule,
    JwtModule.registerAsync({
  inject: [ConfigService],
   useFactory: (config: ConfigService) => ({
    secret: config.get('JWT_SECRET'),
    signOptions: {
      expiresIn: config.get('JWT_EXPIRES'),
    },
  }),
}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, JwtStrategy],   // ← export so JwtAuthGuard works in other modules
})
export class AuthModule {}
