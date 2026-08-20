import { Table, Column, Model, DataType, AllowNull, HasMany } from "sequelize-typescript";
import { Customer } from "./Customer";

@Table({
    tableName: "countries",
    timestamps: true
})

export class Country extends Model {

    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare name: string;

    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare isoCode: string;

    @HasMany(() => Customer)
    declare clients: Customer[];
}