import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/modules/employees/users/users.model';

interface DeviceAttributes {
  id: number;
  user_id: number;
  device_id: string;
  device_name: string;
  device_type: string;
  browser: string;
  ip_address: string;
  user_agent: string;
  last_login_at: Date;
  is_active: boolean;
}

/* =========================
   CREATION ATTRIBUTES
========================= */

interface DeviceCreationAttributes
  extends Partial<DeviceAttributes> {}

/* =========================
   MODEL
========================= */

@Table({
  tableName: 'devices',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Device extends Model<
  DeviceAttributes,
  DeviceCreationAttributes
> {
  @ForeignKey(() => User)
  @Column
  declare user_id: number;

  @BelongsTo(() => User)
  declare user: User;

  @Column
  declare device_id: string;

  @Column
  declare device_name: string;

  @Column
  declare device_type: string;

  @Column
  declare browser: string;

  @Column
  declare ip_address: string;

  @Column(DataType.TEXT)
  declare user_agent: string;

  @Column(DataType.DATE)
  declare last_login_at: Date;

  @Column
  declare is_active: boolean;
}

// @Table({
//   tableName: 'devices',
//   timestamps: true,
//   createdAt: 'created_at',
//   updatedAt: 'updated_at',
// })
// export class Device extends Model<Device> {
//   @ForeignKey(() => User)
//   @Column
//   declare user_id: number;

//   @BelongsTo(() => User)
//   declare user: User;

//   @Column
//   declare device_id: string;

//   @Column
//   declare device_name: string;

//   @Column
//   declare device_type: string;

//   @Column
//   declare browser: string;

//   @Column
//   declare ip_address: string;

//   @Column(DataType.TEXT)
//   declare user_agent: string;

//   @Column(DataType.DATE)
//   declare last_login_at: Date;

//   @Column
//   declare is_active: boolean;
// }
