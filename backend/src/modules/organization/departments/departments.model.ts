import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'departments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Department extends Model<Department> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_deleted: boolean;
}