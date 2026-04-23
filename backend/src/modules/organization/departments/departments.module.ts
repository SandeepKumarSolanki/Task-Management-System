import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Department } from './departments.model';

@Module({
  imports: [SequelizeModule.forFeature([Department])],
  exports: [SequelizeModule],
})
export class DepartmentsModule {}
