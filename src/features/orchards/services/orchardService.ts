import { ApiError } from "@/utils";
import { InsertOrchard } from "../types/orchards.types";
import { IOrchard, orchardsRepository } from "./orchardsRepository";



export class OrchardService {
    constructor(
        private orchardRepository: IOrchard
    ) { }

    async createOrchard(data: InsertOrchard) {
        await this.orchardRepository.create(data);
    }

    async updateOrchardById(id: string, data: InsertOrchard) {
        await this.getOrchardById(id);
        await this.orchardRepository.updateById(id, data);
    }

    async getAllOrchards() {
        return await this.orchardRepository.findAll();
    }

    async getOrchardById(id: string) {
        const orchard = await this.orchardRepository.findById(id);
        if (!orchard) throw ApiError.notFound('Huerta no encontrada');
        return orchard;
    }
}

export const orchardService = new OrchardService(orchardsRepository);