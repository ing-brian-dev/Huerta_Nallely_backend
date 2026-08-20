import { Orchard } from "@/db/schemas";
import { InsertOrchard } from "../types/orchards.types";

export interface IOrchard {
    create(data: InsertOrchard): Promise<void>;
}

export class OrchardRepository implements IOrchard {
    async create(data: InsertOrchard) {
        await Orchard.create(data);
    }
    
}

export const orchardsRepository = new OrchardRepository();