import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
  HasMany,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

import { OrchardCrop } from "./OrchardCrop";

@Table({
  tableName: "orchards",
  timestamps: true,
})

export class Orchard extends Model {

  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare name: string;

  @AllowNull(true)
  @Column(DataType.STRING(250))
  declare municipality: string

  @AllowNull(true)
  @Column(DataType.STRING(100))
  declare state: string

  @AllowNull(true)
  @Column(DataType.DOUBLE(10, 2))
  declare hectares: number

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column(DataType.DATEONLY)
  declare registration_date: string;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  declare is_active: boolean;

  @AllowNull(true)
  @Column(DataType.STRING(250))
  declare orchard_note: string

  @HasMany(() => OrchardCrop )
  declare orchardCrops: OrchardCrop[];
}