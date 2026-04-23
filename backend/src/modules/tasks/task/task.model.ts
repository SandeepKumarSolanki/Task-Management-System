import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import { User } from 'src/modules/employees/users/users.model';
import { TaskStatus } from '../task-status/task-status.model';
import { TaskAssignment } from '../task_assignments.model';

@Table({
  tableName: 'tasks',
  timestamps: true,
})
export class Task extends Model<Task> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare created_by: number;

  @BelongsTo(() => User, 'created_by')
  declare creator: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare assigned_to: number;

  @BelongsTo(() => User, 'assigned_to')
  declare assignee: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare assigned_tl: number | null;

  @BelongsTo(() => User, 'assigned_tl')
  declare teamLeader: User;

  @ForeignKey(() => TaskStatus)
  @Column({ 
    type: DataType.INTEGER, 
    allowNull: true,
  })
  declare status_id: number | null;

  @BelongsTo(() => TaskStatus)
  declare status: TaskStatus;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare due_date: Date | null;

  @HasMany(() => TaskAssignment)
  declare taskAssignments: TaskAssignment[];
}
