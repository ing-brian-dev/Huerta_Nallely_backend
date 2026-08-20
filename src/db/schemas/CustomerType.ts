import { Table, Column, Model, DataType, AllowNull, BelongsTo, HasMany } from "sequelize-typescript";
import { Customer } from "./Customer";

@Table({
    tableName: "customer_types",
    timestamps: true
})

export class CustomerType extends Model {

    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare name: string;

    @AllowNull(false)
    @Column(DataType.STRING(200))
    declare description: string;

    @HasMany(() => Customer)
    declare customer: Customer[];
}