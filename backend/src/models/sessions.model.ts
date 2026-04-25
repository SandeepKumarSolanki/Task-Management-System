
import { User } from "src/modules/employees/users/users.model";
import { Device } from "./devices.model";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Col } from "sequelize/lib/utils";

interface SessionAttributes {
  id: number;
  user_id: number;
  device_id: number;
  access_token: string;
  refresh_token: string;
  ip_address: string;
  is_active: boolean;
  login_at: Date;
  logout_at?: Date;
  expires_at?: Date;
}

interface SessionCreationAttributes
  extends Partial<SessionAttributes> {}

@Table({
  tableName: 'sessions',
  timestamps: false,
})
export class Session extends Model<
  SessionAttributes,
  SessionCreationAttributes
> {
  @ForeignKey(() => User)
  @Column
  declare user_id: number;

  @BelongsTo(() => User)
  declare user: User;

  @ForeignKey(() => Device)
  @Column
  declare device_id: number;

  @BelongsTo(() => Device)
  declare device: Device;

  @Column(DataType.TEXT)
  declare access_token: string;

  @Column(DataType.TEXT)
  declare refresh_token: string;

  @Column
  declare ip_address: string;

  @Column
  declare is_active: boolean;

  @Column
  declare login_at: Date;

  @Column
  declare logout_at: Date;

  @Column
  declare expires_at: Date;
}

// @Table({
//     tableName: 'sessions',
//     timestamps: false,
// })

// export class Session extends Model<Session> {

//     @ForeignKey(() => User)
//     @Column
//     declare user_id: number;

//     @BelongsTo(() => User)
//     declare user: User;

//     @ForeignKey(() => Device)
//     @Column
//     declare device_id: number

//     @BelongsTo(() => Device)
//     declare device: Device;

//     @Column(DataType.TEXT)
//     declare access_token: string;

//     @Column(DataType.TEXT)
//     declare refresh_token: string

//     @Column
//     declare ip_address: string;

//     @Column
//     declare is_active: boolean;

//     @Column
//     declare login_at: Date;

//     @Column 
//     declare logout_at: Date;

//     @Column
//     declare expires_at: Date;

// }