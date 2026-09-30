import { ApiError } from "@/utils";
import { InsertOrchard } from "../types/orchards.types";
import { IOrchard, orchardRepository } from "./orchardsRepository";

export class OrchardService {
    constructor(
        private orchardRepository: IOrchard
    ) { }

    async createOrchard(data: InsertOrchard) {
        await this.orchardRepository.create(data);
    }

    async updateOrchardById(id: number, data: InsertOrchard) {
        await this.getOrchardById(id);

        const assignedHectares = await this.orchardRepository.getAssignedHectares(Number(id));
        if (assignedHectares > Number(data.hectares)) {
            throw ApiError.badRequest(
                `La huerta tiene ${assignedHectares} hectáreas asignadas a productos. Reduzca las hectáreas de sus relaciones antes de disminuir la superficie de la huerta.`
            );
        }

        await this.orchardRepository.updateById(id, data);
    }

    async getAllOrchards() {
        return await this.orchardRepository.findAll();
    }

    async getOrchardById(id: number) {
        const orchard = await this.orchardRepository.findById(id);
        if (!orchard) throw ApiError.notFound('Huerta no encontrada');
        return orchard;
    }
}

export const orchardService = new OrchardService(orchardRepository);