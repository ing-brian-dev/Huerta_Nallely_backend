import { InsertOrchardCrop, SelectOrchardCrop, } from "../types/orchardCrop.types";
import { Orchard, OrchardCrop, Product } from "@/db/schemas";
import { Op } from "sequelize";

export interface IOrchardCropRepository {
    create(data: InsertOrchardCrop): Promise<OrchardCrop>;
    findAll(): Promise<SelectOrchardCrop[]>;
    findAllByOrchardId(orchardId: string): Promise<SelectOrchardCrop[]>;
    findById(id: string): Promise<OrchardCrop | null>;
    findByOrchardAndProduct(orchardId: number, productId: number, excludedId?: string): Promise<OrchardCrop | null>;
    getAssignedHectares(orchardId: number, excludedId?: string): Promise<number>;
    updateById(id: string, data: InsertOrchardCrop): Promise<void>;
    deleteById(id: string): Promise<void>;
    findOrchardById(id: number): Promise<Orchard | null>;
    findProductById(id: number): Promise<Product | null>;
}

export class OrchardCropRepository implements IOrchardCropRepository {

    async create(data: InsertOrchardCrop) {
        return await OrchardCrop.create(data);
    }

    async findAll() {
        return await OrchardCrop.findAll({
            include: [
                { model: Orchard, attributes: ["id", "name", "hectares"] },
                { model: Product, attributes: ["id", "name"] },
            ],
            order: [["id", "DESC"]],
        });
    }

    async findAllByOrchardId(orchardId: string) {
        return await OrchardCrop.findAll({
            where: { orchard_id: orchardId },
            include: [
                { model: Orchard, attributes: ["id", "name", "hectares"] },
                { model: Product, attributes: ["id", "name"] },
            ],
            order: [["id", "DESC"]],
        });
    }

    async findById(id: string) {
        return await OrchardCrop.findByPk(id, {
            include: [
                { model: Orchard, attributes: ["id", "name", "hectares"] },
                { model: Product, attributes: ["id", "name"] },
            ],
        });
    }

    async findByOrchardAndProduct(orchard_id: number, product_id: number, excludedId?: string) {
        return await OrchardCrop.findOne({
            where: {
                orchard_id,
                product_id,
                ...(excludedId ? { id: { [Op.ne]: excludedId } } : {}),
            },
        });
    }

    async getAssignedHectares(orchard_id: number, excludedId?: string) {
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

    async updateById(id: string, data: InsertOrchardCrop) {
        await OrchardCrop.update(data, { where: { id } });
    }

    async deleteById(id: string) {
        await OrchardCrop.destroy({ where: { id } });
    }

    async findOrchardById(id: number) {
        return await Orchard.findByPk(id);
    }

    async findProductById(id: number) {
        return await Product.findByPk(id);
    }
}

export const orchardCropRepository = new OrchardCropRepository();
