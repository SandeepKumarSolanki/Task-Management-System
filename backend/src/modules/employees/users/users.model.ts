import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import { Department } from 'src/modules/organization/departments/departments.model';
import { Role } from 'src/modules/organization/roles/roles.model';
import { Designation } from 'src/modules/organization/designations/designations.model';
import { EmployeeHistory } from '../employee-history/employee-history.model';


@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class User extends Model<User> {


  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare department_id: number | null;

  @BelongsTo(() => Department)
  declare department: Department;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare role_id: number | null;

  @BelongsTo(() => Role)
  declare role: Role;

  @ForeignKey(() => Designation)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare designation_id: number | null;

  @BelongsTo(() => Designation)
  declare designation: Designation;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;

  @HasMany(() => EmployeeHistory)
  declare histories: EmployeeHistory[];
}