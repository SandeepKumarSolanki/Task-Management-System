import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Task } from '../task/task.model';


@Table({
  tableName: 'task_status',
  timestamps: true,
  paranoid: true,
})
export class TaskStatus extends Model<TaskStatus> {

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
     STATUS NAME
  ====================== */
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare name: string;

  /* ======================
     STATUS CODE
  ====================== */
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare code: string;

  /* ======================
     DISPLAY ORDER
  ====================== */
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  declare order: number;

  /* ======================
     DEFAULT STATUS
  ====================== */
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_default: boolean;

  /* ======================
     ACTIVE FLAG
  ====================== */
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;

  /* ======================
     RELATION WITH TASKS
  ====================== */

  @HasMany(() => Task)
  declare tasks: Task[];
}