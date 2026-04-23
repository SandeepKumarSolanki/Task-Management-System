import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'roles',
  timestamps: true,
  paranoid: true,            //enables soft delete
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class Role extends Model<Role> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare slug: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;
}