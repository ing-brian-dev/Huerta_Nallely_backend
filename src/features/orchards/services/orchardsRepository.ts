import { Orchard } from "@/db/schemas";
import { InsertOrchard, SelectOrchard } from "../types/orchards.types";

export interface IOrchard {
    create(data: InsertOrchard): Promise<void>;
    findAll(): Promise<SelectOrchard[]>;
    findById(id: string): Promise<SelectOrchard>;
    updateById(id: string, data: InsertOrchard): Promise<void>;
}

export class OrchardRepository implements IOrchard {
    async create(data: InsertOrchard) {
        await Orchard.create(data);
    }

    async findAll() {
        return await Orchard.findAll();
    }

    async findById(id: string): Promise<SelectOrchard> {
        return await Orchard.findOne({ where: { id } });
    }

    async updateById(id: string, data: InsertOrchard) {
        await Orchard.update(data, { where: { id } });
    }
}

export const orchardsRepository = new OrchardRepository();