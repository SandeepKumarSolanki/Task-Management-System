import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Task } from './task/task.model';
import { User } from 'src/modules/employees/users/users.model';

@Table({
  tableName: 'task_assignments',
  timestamps: true,
})
export class TaskAssignment extends Model<TaskAssignment> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Task)
  @Column(DataType.INTEGER)
  declare task_id: number;

  @BelongsTo(() => Task)
  declare task: Task;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare developer_id: number;

  @BelongsTo(() => User, 'developer_id')
  declare developer: User;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare assigned_by: number;

  @BelongsTo(() => User, 'assigned_by')
  declare teamLeader: User;
}




// import {
//   Table,
//   Column,
//   Model,
//   DataType,
//   ForeignKey,
//   BelongsTo,
// } from 'sequelize-typescript';

// import { User } from 'src/modules/users/user/user.model';
// import { Task } from '../task/task.model';

// @Table({
//   tableName: 'task_assignments',
//   timestamps: true,
// })
// export class TaskAssignment extends Model<TaskAssignment> {

//   @Column({
//     type: DataType.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   })
//   id: number;

//   // ================= TASK =================
//   @ForeignKey(() => Task)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   task_id: number;

//   @BelongsTo(() => Task)
//   task: Task;

//   // ================= DEVELOPER =================
//   @ForeignKey(() => User)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   developer_id: number;

//   @BelongsTo(() => User, 'developer_id')
//   developer: User;

//   // ================= ASSIGNED BY (TL) =================
//   @ForeignKey(() => User)
//   @Column({
//     type: DataType.INTEGER,
//   })
//   assigned_by: number;

//   @BelongsTo(() => User, 'assigned_by')
//   assignedBy: User;

//   // ================= ASSIGNED DATE =================
//   @Column({
//     type: DataType.DATE,
//     defaultValue: DataType.NOW,
//   })
//   assigned_at: Date;
// }