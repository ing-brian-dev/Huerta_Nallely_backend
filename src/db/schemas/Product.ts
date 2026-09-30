import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
  HasMany
} from "sequelize-typescript";

import { OrchardCrop } from "./OrchardCrop";

@Table({
  tableName: "products",
  timestamps: true,
})
export class Product extends Model {

  @AllowNull(false)
  @Column(DataType.STRING(100))
  declare name: string;

  @AllowNull(true)
  @Column(DataType.STRING(250))
  declare description: string;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  declare is_active: boolean;

  @HasMany(() => OrchardCrop)
  declare orchardCrops: OrchardCrop[];
}