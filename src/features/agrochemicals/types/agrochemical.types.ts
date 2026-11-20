import { AgrochemicalCategory, UnitOfMeasurement } from "@/db/schemas";
import { Agrochemical } from "@/db/schemas/Agrochemical";
import { InferAttributes, InferCreationAttributes } from "sequelize";

export type InsertAgrochemical = InferCreationAttributes<Agrochemical>
export type SelectAgrochemical = InferAttributes<Agrochemical>;

export type InsertAgrochemicalCategory = InferCreationAttributes<AgrochemicalCategory>;
export type SelectAgrochemicalCategory = InferAttributes<AgrochemicalCategory>;

export type InserUnitOfMeasurement = InferCreationAttributes<UnitOfMeasurement>;
export type SelectUnitOfMeasurement = InferAttributes<UnitOfMeasurement>;

