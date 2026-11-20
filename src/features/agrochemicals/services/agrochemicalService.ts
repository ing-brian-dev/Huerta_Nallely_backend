import { ApiError } from "@/utils";
import { InsertAgrochemical, InsertAgrochemicalCategory } from "../types/agrochemical.types";
import { agrochemicalRepository, IAgrochemical } from "./agrochemicalRepository";

export class AgrochemicalService {

    constructor(
        private agrochemicalRepository: IAgrochemical
    ) { }

    async getAllAgrochemicals() {
        const agrochemicals = await this.agrochemicalRepository.findAll();
        if (agrochemicals.length === 0) throw ApiError.notFound("No hay agroquimicos creados aún.");
        return agrochemicals;
    }

    async createAgrochemical(data: InsertAgrochemical) {
        await this.findAgrochemicalById(data.category_id);
        return await this.agrochemicalRepository.create(data);
    }

    async findAgrochemicalById(id: number) {
        const agrochemical = await this.agrochemicalRepository.findById(id);
        if (!agrochemical) throw ApiError.notFound("Agroquimico no encontrado.");
        return agrochemical;
    }

    //Categories

    async getAllAgrochemicalCategories() {
        return await this.agrochemicalRepository.findAllCategories();
    }

    async createAgrochemicalCategory(data: InsertAgrochemicalCategory) {
        return await this.agrochemicalRepository.createCategory(data);
    }

    async findAgrochemicalCategory(id: number) {
        const category = await this.agrochemicalRepository.findCategoryById(id);
        if (!category) throw ApiError.notFound("Categoria de Agroquimico no obtenida.");
        return category;
    }
}

export const agrochemicalService = new AgrochemicalService(agrochemicalRepository);