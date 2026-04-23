import { Module } from '@nestjs/common';
import { DepartmentsModule } from './departments/departments.module';
import { RolesModule } from './roles/roles.module';
import { DesignationsModule } from './designations/designations.module';

@Module({
  imports: [DepartmentsModule, RolesModule, DesignationsModule]
})
export class OrganizationModule {}
