import { Op } from "sequelize";
import { Orchard, OrchardCrop, Product } from "@/db/schemas";
import { InsertOrchardCrop, SelectOrchardCrop } from "../types";

export interface IOrchardCropRepository {
    create(data: InsertOrchardCrop): Promise<void>;
    findAll(): Promise<SelectOrchardCrop[]>;
    findAllByOrchardId(orchardId: number): Promise<SelectOrchardCrop[]>;
    findById(id: number): Promise<OrchardCrop | null>;
    findByOrchardAndProduct(orchardId: number, productId: number, excludedId?: number): Promise<OrchardCrop | null>;
    getAssignedHectares(orchardId: number, excludedId?: number): Promise<number>;
    updateById(id: number, data: InsertOrchardCrop): Promise<void>;
    deleteById(id: number): Promise<void>;
}
const productSearch = { model: Product, attributes: ["id", "name"] };
const orchardSearch = { model: Orchard, attributes: ["id", "name"] };

export class OrchardCropRepository implements IOrchardCropRepository {

    async create(data: InsertOrchardCrop) {
        await OrchardCrop.create(data);
    }

    async findAll() {
        return await OrchardCrop.findAll({
            include: [
                orchardSearch,
                productSearch
            ],
            order: [["id", "DESC"]],
        });
    }

    async findAllByOrchardId(orchard_id: number) {
        return await OrchardCrop.findAll({
            where: { orchard_id },
            include: [
                productSearch
            ],
            order: [["id", "DESC"]],
        });
    }

    async findById(id: number) {
        return await OrchardCrop.findByPk(id, {
            attributes: {
                exclude: ['orchard_id', 'product_id']
            },
            include: [
                orchardSearch,
                productSearch
            ],
        });
    }

    async findByOrchardAndProduct(orchard_id: number, product_id: number, excludedId?: number) {
        return await OrchardCrop.findOne({
            where: {
                orchard_id,
                product_id,
                ...(excludedId ? { id: { [Op.ne]: excludedId } } : {}),
            },
        });
    }

    async getAssignedHectares(orchard_id: number, excludedId?: number) {
        const result = await OrchardCrop.sum("hectares", {
            where: {
                orchard_id,
                is_active: true,
                ...(excludedId
                    ? { id: { [Op.ne]: excludedId } }
                    : {}),
            },
        });

        return Number(result || 0);
    }

    async updateById(id: number, data: InsertOrchardCrop) {
        await OrchardCrop.update(data, { where: { id } });
    }

    async deleteById(id: number) {
        await OrchardCrop.destroy({ where: { id } });
    }
}

export const orchardCropRepository = new OrchardCropRepository();
