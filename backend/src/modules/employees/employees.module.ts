import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { EmployeeHistoryModule } from './employee-history/employee-history.module';

@Module({
  imports: [UsersModule, EmployeeHistoryModule]
})
export class EmployeesModule {}

