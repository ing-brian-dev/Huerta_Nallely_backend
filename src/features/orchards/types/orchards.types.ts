import { Orchard } from "@/db/schemas";
import { InferAttributes, InferCreationAttributes } from "sequelize";

export type InsertOrchard = InferCreationAttributes<Orchard>
export type SelectOrchard = InferAttributes<Orchard>;