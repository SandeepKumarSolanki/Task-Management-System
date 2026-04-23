import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from '../users/users.model';
import { Department } from 'src/modules/organization/departments/departments.model';
import { Role } from 'src/modules/organization/roles/roles.model';
import { Designation } from 'src/modules/organization/designations/designations.model';


@Table({
  tableName: 'employee_histories',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class EmployeeHistory extends Model<EmployeeHistory> {

  /* ======================
     PRIMARY KEY
  ====================== */

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  /* ======================
     USER RELATION
  ====================== */

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @BelongsTo(() => User)
  declare user: User;

  /* ======================
     DEPARTMENT RELATION
  ====================== */

  @ForeignKey(() => Department)
  @Column(DataType.INTEGER)
  declare department_id: number;

  @BelongsTo(() => Department)
  declare department: Department;

  /* ======================
     ROLE RELATION
  ====================== */

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare role_id: number;

  @BelongsTo(() => Role)
  declare role: Role;

  /* ======================
     DESIGNATION RELATION
  ====================== */

  @ForeignKey(() => Designation)
  @Column(DataType.INTEGER)
  declare designation_id: number;

  @BelongsTo(() => Designation)
  declare designation: Designation;

  /* ======================
     CAREER TIMELINE
  ====================== */

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare start_date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare end_date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare reason: string;
}