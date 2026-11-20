import { Table, Column, Model, DataType, AllowNull, HasMany } from "sequelize-typescript";
import { Agrochemical } from "./Agrochemical";

@Table({
    tableName: "units_of_measurement",
    timestamps: true,
})

export class UnitOfMeasurement extends Model {
    @AllowNull(false)
    @Column(DataType.STRING(50))
    declare name: string;

    //Relations
    @HasMany(() => Agrochemical)
    declare agrochemicals: Agrochemical[];
}