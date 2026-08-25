import {
    Table,
    Column,
    Model,
    DataType,
    AllowNull,
    Default,
    BelongsTo,
    ForeignKey,
} from "sequelize-typescript";

import { Orchard } from "./Orchard";
import { Product } from "./Product";

@Table({
    tableName: "orchard_crops",
    timestamps: false,
})
export class OrchardCrop extends Model {

    @AllowNull(true)
    @Column(DataType.DECIMAL(10, 2))
    declare hectares: number;

    @AllowNull(true)
    @Column(DataType.DATEONLY)
    declare planting_date: string;

    @AllowNull(false)
    @Default(true)
    @Column(DataType.BOOLEAN)
    declare is_active: boolean;

    @AllowNull(true)
    @Column(DataType.STRING(500))
    declare notes: string | null;

    @AllowNull(false)
    @ForeignKey(() => Orchard)
    @Column(DataType.INTEGER.UNSIGNED)
    declare orchard_id: number;

    @AllowNull(false)
    @ForeignKey(() => Product)
    @Column(DataType.INTEGER.UNSIGNED)
    declare product_id: number;

    // Relationships

    @BelongsTo(() => Orchard, {
        foreignKey: "id",
    })
    declare orchard: Orchard;

    @BelongsTo(() => Product, {
        foreignKey: "id",
    })
    declare product: Product;
}