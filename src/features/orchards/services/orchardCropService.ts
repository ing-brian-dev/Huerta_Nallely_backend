import { ApiError } from "@/utils";
import { InsertOrchardCrop } from "../types";
import { IOrchardCropRepository, orchardCropRepository, IOrchardRepository, orchardRepository, IProductRepository, productRepository } from "./index";

export class OrchardCropService {
    constructor(
        private orchardCropRepository: IOrchardCropRepository,
        private orchardRepository: IOrchardRepository,
        private productRepository: IProductRepository
    ) { }

    async create(data: InsertOrchardCrop) {
        await this.validateRelations(data);
        await this.validateAvailableHectares(
            data.is_active === false ? 0 : data.hectares,
            data.orchard_id
        );
        await this.ensureUniqueRelation(data.orchard_id, data.product_id);
        return await this.orchardCropRepository.create(data);
    }

    async getAll() {
        return await this.orchardCropRepository.findAll();
    }

    async getAllByOrchardId(orchardId: number) {
        const orchard = await this.orchardRepository.findById(Number(orchardId));
        if (!orchard) throw ApiError.notFound("Huerta no encontrada.");
        return await this.orchardCropRepository.findAllByOrchardId(Number(orchardId));
    }

    async getAvailability(orchardId: number) {
        const orchard = await this.orchardRepository.findById(Number(orchardId));
        if (!orchard) throw ApiError.notFound("Huerta no encontrada.");

        const totalHectares = Number(orchard.hectares || 0);
        const assignedHectares = await this.orchardCropRepository.getAssignedHectares(
            Number(orchardId)
        );
        const availableHectares = Math.max(totalHectares - assignedHectares, 0);

        return {
            orchard_id: Number(orchardId),
            total_hectares: totalHectares,
            assigned_hectares: assignedHectares,
            available_hectares: availableHectares,
            used_percentage: totalHectares
                ? Number(((assignedHectares / totalHectares) * 100).toFixed(2))
                : 0,
            available_percentage: totalHectares
                ? Number(((availableHectares / totalHectares) * 100).toFixed(2))
                : 0,
        };
    }

    async getById(id: number) {
        const crop = await this.orchardCropRepository.findById(Number(id));
        if (!crop) throw ApiError.notFound("Relación huerta-producto no encontrada.");
        return crop;
    }

    async update(id: number, data: InsertOrchardCrop) {
        await this.getById(id);
        await this.validateRelations(data);
        await this.validateAvailableHectares(data.is_active === false ? 0 : data.hectares, data.orchard_id, id);
        await this.ensureUniqueRelation(data.orchard_id, data.product_id, id);
        await this.orchardCropRepository.updateById(id, data);
    }

    async delete(id: number) {
        await this.getById(id);
        await this.orchardCropRepository.deleteById(id);
    }

    private async validateRelations(data: InsertOrchardCrop) {
        const orchard = await this.orchardRepository.findById(data.orchard_id);
        if (!orchard) throw ApiError.notFound("Huerta no encontrada.");
        if (!orchard.is_active) throw ApiError.badRequest("La huerta está inactiva.");

        const product = await this.productRepository.findById(Number(data.product_id));
        if (!product) throw ApiError.notFound("Producto no encontrado.");
        if (!product.is_active) throw ApiError.badRequest("El producto está inactivo.");
    }

    private async validateAvailableHectares(hectares: number, orchardId: number, excludedId?: number) {

        const orchard = await this.orchardRepository.findById(orchardId);
        const assignedHectares = await this.orchardCropRepository.getAssignedHectares(orchardId, excludedId);

        if (assignedHectares + hectares > Number(orchard?.hectares || 0)) {
            throw ApiError.badRequest(
                "Las hectáreas asignadas no pueden superar la superficie total de la huerta."
            );
        }
    }

    private async ensureUniqueRelation(orchardId: number, productId: number, excludedId?: number) {
        const relation = await this.orchardCropRepository.findByOrchardAndProduct(orchardId, productId, excludedId);

        if (relation) throw ApiError.conflict("El producto ya está relacionado con esta huerta.");
    }
}

export const orchardCropService = new OrchardCropService(orchardCropRepository, orchardRepository, productRepository);
