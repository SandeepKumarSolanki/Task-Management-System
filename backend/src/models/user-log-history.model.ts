import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { User } from 'src/modules/employees/users/users.model';

interface UserLogHistoryAttributes {
  id: number;
  user_id: number;
  device_id: number;
  action: string;
  ip_address: string;
  description: string;
  created_at: Date;
}

interface UserLogHistoryCreationAttributes
  extends Partial<UserLogHistoryAttributes> {}

@Table({
  tableName: 'user_log_history',
  timestamps: false,
})
export class UserLogHistory extends Model<
  UserLogHistoryAttributes,
  UserLogHistoryCreationAttributes
> {
  @ForeignKey(() => User)
  @Column
  declare user_id: number;

  @Column
  declare device_id: number;

  @Column
  declare action: string;

  @Column
  declare ip_address: string;

  @Column(DataType.TEXT)
  declare description: string;

  @Column
  declare created_at: Date;
}

// @Table({
//   tableName: 'user_log_history',
//   timestamps: false,
// })
// export class UserLogHistory extends Model<UserLogHistory> {

//   @ForeignKey(() => User)
//   @Column
//   declare user_id: number;

//   @Column
//   declare device_id: number;

//   @Column
//   declare action: string;

//   @Column
//   declare ip_address: string;

//   @Column(DataType.TEXT)
//   declare description: string;

//   @Column
//   declare created_at: Date;
// }