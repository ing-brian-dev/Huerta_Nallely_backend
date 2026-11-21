import { Product } from "@/db/schemas";
import { InferAttributes, InferCreationAttributes } from "sequelize";

export type InsertProduct = InferCreationAttributes<Product>;
export type SelectProduct = InferAttributes<Product>;
