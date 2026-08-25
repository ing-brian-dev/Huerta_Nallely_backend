import { Table, Column, Model, DataType, Default, AllowNull } from "sequelize-typescript";

@Table({
    tableName: "suppliers",
    timestamps: true
})

export class Supplier extends Model {

    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare name: string;

    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare contact_name: string;

    @AllowNull(false)
    @Column(DataType.STRING(20))
    declare phone: string;

    @Column(DataType.STRING(200))
    declare address: string;

    @Column(DataType.STRING(100))
    declare email: string;

    @AllowNull(false)
    @Default(1)
    @Column(DataType.BOOLEAN)
    declare is_active: boolean;
}