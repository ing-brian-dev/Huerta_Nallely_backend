import { Table, Column, Model, DataType, AllowNull, Default, ForeignKey, BelongsTo } from "sequelize-typescript";
import { AgrochemicalCategory } from "./AgrochemicalCategory";
import { UnitOfMeasurement } from "./UnitOfMeasurement";

@Table({
    tableName: "agrochemicals",
    timestamps: true,
})

export class Agrochemical extends Model {
    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare name: string;

    @AllowNull(false)
    @ForeignKey(() => AgrochemicalCategory)
    @Column(DataType.INTEGER)
    declare category_id: number;

    @AllowNull(false)
    @ForeignKey(() => UnitOfMeasurement)
    @Column(DataType.INTEGER)
    declare unit_of_measurement_id: number;

    @AllowNull(false)
    @Default(true)
    @Column(DataType.BOOLEAN)
    declare is_active: boolean;

    //Relations
    @BelongsTo(() => AgrochemicalCategory)
    declare category: AgrochemicalCategory;

    @BelongsTo(() => UnitOfMeasurement)
    declare unit_of_measurement: UnitOfMeasurement;
}