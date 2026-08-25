import { Table, Column, Model, DataType, Default, AllowNull, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Country } from "./Country";
import { CustomerType } from "./CustomerType";

@Table({
    tableName: "customers",
    timestamps: true
})

export class Customer extends Model {

    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare name: string;

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

    //ForeignKeys

    @ForeignKey(() => Country)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare country_id: number;
    @BelongsTo(() => Country)
    declare country: Country;


    @ForeignKey(() => CustomerType)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare customer_type_id: number;
    @BelongsTo(() => CustomerType)
    declare customer_type: CustomerType;
}