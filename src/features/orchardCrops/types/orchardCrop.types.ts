import { OrchardCrop } from "@/db/schemas";
import { InferAttributes, InferCreationAttributes } from "sequelize";

export type InsertOrchardCrop = InferCreationAttributes<OrchardCrop>
export type SelectOrchardCrop = InferAttributes<OrchardCrop>;
