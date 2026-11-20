import { Table, Column, Model, DataType, AllowNull, HasMany } from "sequelize-typescript";
import { Agrochemical } from "./Agrochemical";

@Table({
    tableName: "agrochemical_categories",
    timestamps: true,
})

export class AgrochemicalCategory extends Model {
    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare name: string;

    @AllowNull(true)
    @Column(DataType.STRING(250))
    declare description: string | null;

    //Relations
    @HasMany(() => Agrochemical)
    declare agrochemical: Agrochemical[];
}