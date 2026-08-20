import { User } from "@/db/schemas";
import { InferAttributes, InferCreationAttributes } from "sequelize";

export type InsertUser = InferCreationAttributes<User>
export type SelectUser = InferAttributes<User>;