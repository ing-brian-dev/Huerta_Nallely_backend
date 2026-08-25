import { Table, Column, Model, DataType, Default, Unique, AllowNull } from "sequelize-typescript";

@Table({
    tableName: "users",
    timestamps: true
})

export class User extends Model {

    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare name: string;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare email: string;

    @Column(DataType.STRING(60))
    declare password: string;

    @AllowNull(true)
    @Column(DataType.DATE)
    declare token_expires_at: Date | null;

    @AllowNull(true)
    @Column(DataType.STRING(36))
    declare token: string | null;

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    declare confirmed: boolean;

}