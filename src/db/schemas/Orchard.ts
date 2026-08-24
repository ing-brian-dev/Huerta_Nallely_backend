import { Table, Column, Model, DataType, AllowNull, Default } from "sequelize-typescript";

@Table({
    tableName: "orchards",
    timestamps: true
})

export class Orchard extends Model {

    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare name: string;

    @Column(DataType.STRING(250))
    declare municipality: string;

    @Column(DataType.STRING(100))
    declare state: string;

    @Column(DataType.DECIMAL(10,2))
    declare hectares: number;

    @AllowNull(false)
    @Default(DataType.NOW)
    @Column(DataType.DATEONLY)
    declare registration_date: string;

    @AllowNull(false)
    @Default(1)
    @Column(DataType.BOOLEAN)
    declare isActive: boolean;

    @Column(DataType.STRING(250))
    declare orchard_note: string;
}