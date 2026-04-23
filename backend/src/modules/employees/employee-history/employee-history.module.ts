import { Module } from '@nestjs/common';
import { EmployeeHistory } from './employee-history.model';
import { User } from '../users/users.model';
import { Department } from 'src/modules/organization/departments/departments.model';
import { Role } from 'src/modules/organization/roles/roles.model';
import { Designation } from 'src/modules/organization/designations/designations.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([
      EmployeeHistory,
      User,
      Department,
      Role,
      Designation
    ])
  ]
})
export class EmployeeHistoryModule {}
