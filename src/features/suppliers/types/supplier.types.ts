import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Supplier } from "@/db/schemas";

export type InsertSupplier = InferCreationAttributes<Supplier>;
export type SelectSupplier = InferAttributes<Supplier>;