import { Country } from "@/db/schemas";
import { InferAttributes } from "sequelize";

export type SelectCountry = InferAttributes<Country>;
