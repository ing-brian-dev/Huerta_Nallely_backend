import { countryRepository, ICountryRepository } from "./countryRepository";


export class CountryService {
    constructor(
        private countryRepository: ICountryRepository
    ) { }

    async getCountryById(id: number) {
        return await this.countryRepository.findById(id);
    }

    async getAllCountries(){
        return await this.countryRepository.getAll();
    }
}

export const countryService = new CountryService(countryRepository);