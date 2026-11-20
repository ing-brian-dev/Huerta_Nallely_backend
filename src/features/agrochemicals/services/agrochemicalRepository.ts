import { Agrochemical, AgrochemicalCategory } from "@/db/schemas";
import { InsertAgrochemical, InsertAgrochemicalCategory, SelectAgrochemical, SelectAgrochemicalCategory } from "../types/agrochemical.types";

export interface IAgrochemical {
    findAll(): Promise<SelectAgrochemical[]>;
    create(data: InsertAgrochemical): Promise<void>;
    findById(id: number): Promise<SelectAgrochemical>

    //Categories
    findAllCategories(): Promise<SelectAgrochemicalCategory[]>;
    createCategory(data: InsertAgrochemicalCategory): Promise<void>;
    findCategoryById(id: number): Promise<SelectAgrochemicalCategory>;
}

export class AgrochemicalRepository implements IAgrochemical {

    async findAll() {
        return await Agrochemical.findAll();
    }

    async create(data: InsertAgrochemical) {
        await Agrochemical.create(data);
    }

    async findById(id: number) {
        return await Agrochemical.findByPk(id);
    }

    //Categories
    async findAllCategories() {
        return await AgrochemicalCategory.findAll();
    }

    async createCategory(data: InsertAgrochemicalCategory) {
        await AgrochemicalCategory.create(data);
    }

    async findCategoryById(id: number) {
        return await AgrochemicalCategory.findByPk(id);
    }

}

export const agrochemicalRepository = new AgrochemicalRepository();