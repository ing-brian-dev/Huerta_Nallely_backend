import { Country } from "@/db/schemas";
import { SelectCountry } from "../types/country.types";

export interface ICountryRepository {
    findById(id: number): Promise<SelectCountry | null>
    getAll(): Promise<SelectCountry[]>
}

export class CountryRepository implements ICountryRepository {
    async findById(id: number) {
        return await Country.findByPk(id);
    }

    async getAll() {
        return await Country.findAll({ attributes: ['id', 'name', 'isoCode'] });
    }
}

export const countryRepository = new CountryRepository();