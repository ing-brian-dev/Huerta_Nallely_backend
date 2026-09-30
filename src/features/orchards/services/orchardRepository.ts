import { Orchard, OrchardCrop, Product } from "@/db/schemas";
import { InsertOrchard, SelectOrchard } from "../types/orchards.types";

export interface IOrchard {
    create(data: InsertOrchard): Promise<void>;
    findAll(): Promise<SelectOrchard[]>;
    findById(id: number): Promise<SelectOrchard>;
    getAssignedHectares(orchardId: number): Promise<number>;
    updateById(id: number, data: InsertOrchard): Promise<void>;
}

const productSearch = {
    model: Product, attributes: ['id', 'name']
};

const orchardCropSearch = {
    attributes: {
        exclude: ['orchard_id', 'product_id'],
    },
};


export class OrchardRepository implements IOrchard {
    async create(data: InsertOrchard) {
        await Orchard.create(data);
    }

    async findAll() {
        return await Orchard.findAll({
            include: [
                {
                    model: OrchardCrop,
                    ...orchardCropSearch,
                    include: [
                        productSearch
                    ]
                }
            ]
        });
    }

    async findById(id: number): Promise<SelectOrchard> {
        return await Orchard.findOne({
            where: { id },
            include: [
                {
                    model: OrchardCrop,
                    ...orchardCropSearch,
                    include: [
                        productSearch
                    ]
                }
            ]
        });
    }

    async getAssignedHectares(orchardId: number) {
        const result = await OrchardCrop.sum("hectares", {
            where: { orchard_id: orchardId, is_active: true },
        });

        return Number(result || 0);
    }

    async updateById(id: number, data: InsertOrchard) {
        await Orchard.update(data, { where: { id } });
    }
}

export const orchardRepository = new OrchardRepository();