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

    @AllowNull(false)
    @Column(DataType.DOUBLE(10, 2))
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
    declare note: string | null;

    @AllowNull(false)
    @ForeignKey(() => Orchard)
    @Column(DataType.INTEGER)
    declare orchard_id: number;

    @AllowNull(false)
    @ForeignKey(() => Product)
    @Column(DataType.INTEGER)
    declare product_id: number;

    // Relationships

    @BelongsTo(() => Orchard)
    declare orchard: Orchard;

    @BelongsTo(() => Product)
    declare product: Product;
}