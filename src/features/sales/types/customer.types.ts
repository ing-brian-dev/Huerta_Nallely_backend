import { Customer, CustomerType } from "@/db/schemas";
import { InferAttributes, InferCreationAttributes } from "sequelize";

export type InsertCustomer = InferCreationAttributes<Customer>;
export type SelectCustomer = InferAttributes<Customer>;

export type InsertCustomerType = InferCreationAttributes<CustomerType>;
export type SelectCustomerType = InferAttributes<CustomerType>;
