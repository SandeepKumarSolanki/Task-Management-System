import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Designation } from './designations.model'; 

@Module({
  imports: [SequelizeModule.forFeature([Designation])],
  exports: [SequelizeModule],
})
export class DesignationsModule {}
