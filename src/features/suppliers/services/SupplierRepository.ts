import { Supplier } from "@/db/schemas";
import { InsertSupplier, SelectSupplier } from "../types/supplier.types";

export interface ISupplierRepository {
    create(data: InsertSupplier): Promise<void>;
    findById(id: string): Promise<SelectSupplier | null>;
    findByEmail(email: string): Promise<SelectSupplier | null>;
    findByPhone(phone: string): Promise<SelectSupplier | null>;
    updateById(id: string, supplier: InsertSupplier): Promise<void>;
    getAll(): Promise<SelectSupplier[] | null>;
}

class SupplierRepository implements ISupplierRepository {
    async create(data: InsertSupplier) {
        await Supplier.create(data);
    }

    async findById(id: string) {
        const supplier = await Supplier.findByPk(id);
        return supplier;
    }

    async findByEmail(email: string) {
        const supplier = await Supplier.findOne({ where: { email } });
        return supplier;
    }

    async findByPhone(phone: string) {
        const supplier = await Supplier.findOne({ where: { phone } });
        return supplier;
    }

    async updateById(id: string, supplier: InsertSupplier) {
        await Supplier.update(supplier, {
            where: { id },
        });
        return;
    }

    async getAll() {
        const suppliers = await Supplier.findAll({
            order: [
                ["id", "DESC"],
            ],
        });
        return suppliers;
    }
}

export const supplierRepository = new SupplierRepository();
