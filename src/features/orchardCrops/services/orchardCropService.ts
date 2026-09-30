import { ApiError } from "@/utils";
import { InsertOrchardCrop } from "../types/orchardCrop.types";
import { IOrchardCropRepository, orchardCropRepository, } from "./orchardCropRepository";
import { orchardRepository } from "@/features/orchards/services/orchardRepository";
import { IProduct, productRepository } from "@/features/products/services/productRepository";
import { IOrchard } from "@/features/orchards/services/orchardsRepository";

export class OrchardCropService {
    constructor(
        private orchardCropRepository: IOrchardCropRepository,
        private orchardRepository: IOrchard,
        private productRepository: IProduct
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

    async getAllByOrchardId(orchardId: string) {
        const orchard = await this.orchardRepository.findById(Number(orchardId));
        if (!orchard) throw ApiError.notFound("Huerta no encontrada.");
        return await this.orchardCropRepository.findAllByOrchardId(orchardId);
    }

    async getAvailability(orchardId: string) {
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

    async getById(id: string) {
        const crop = await this.orchardCropRepository.findById(id);
        if (!crop) throw ApiError.notFound("Relación huerta-producto no encontrada.");
        return crop;
    }

    async update(id: string, data: InsertOrchardCrop) {
        await this.getById(id);
        await this.validateRelations(data);
        await this.validateAvailableHectares(data.is_active === false ? 0 : data.hectares, data.orchard_id, id);
        await this.ensureUniqueRelation(data.orchard_id, data.product_id, id);
        await this.orchardCropRepository.updateById(id, data);
    }

    async delete(id: string) {
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

    private async validateAvailableHectares(hectares: number, orchardId: number, excludedId?: string) {

        const orchard = await this.orchardRepository.findById(orchardId);
        const assignedHectares = await this.orchardCropRepository.getAssignedHectares(orchardId, excludedId);

        if (assignedHectares + hectares > Number(orchard?.hectares || 0)) {
            throw ApiError.badRequest(
                "Las hectáreas asignadas no pueden superar la superficie total de la huerta."
            );
        }
    }

    private async ensureUniqueRelation(orchardId: number, productId: number, excludedId?: string) {
        const relation = await this.orchardCropRepository.findByOrchardAndProduct(orchardId, productId, excludedId);

        if (relation) throw ApiError.conflict("El producto ya está relacionado con esta huerta.");
    }
}

export const orchardCropService = new OrchardCropService(orchardCropRepository, orchardRepository, productRepository);
