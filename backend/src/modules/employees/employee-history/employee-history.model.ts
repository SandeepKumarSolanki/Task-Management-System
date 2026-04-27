import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';

import { User } from '../users/users.model';
import { Department } from 'src/modules/organization/departments/departments.model';
import { Role } from 'src/modules/organization/roles/roles.model';
import { Designation } from 'src/modules/organization/designations/designations.model';
import { allow } from 'joi';

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
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare department_id: number | null;

  @BelongsTo(() => Department)
  declare department: Department;

  /* ======================
     ROLE RELATION
  ====================== */

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    // allowNull: false,
    allowNull: true,
  })
  declare role_id: number | null;

  @BelongsTo(() => Role)
  declare role: Role;

  /* ======================
     DESIGNATION RELATION
  ====================== */

  @ForeignKey(() => Designation)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare designation_id: number | null;

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
  declare end_date: Date | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare reason: string;
}
