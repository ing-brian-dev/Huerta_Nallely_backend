import { InsertOrchard } from "../types/orchards.types";
import { IOrchard, orchardsRepository } from "./orchardsRepository";



export class OrchardService {
    constructor(
        private orchardRepository: IOrchard
    ) { }

    async createOrchard(data: InsertOrchard) {
        await this.orchardRepository.create(data);
    }
}

export const orchardService = new OrchardService(orchardsRepository);