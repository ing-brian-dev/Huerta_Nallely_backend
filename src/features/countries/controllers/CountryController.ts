import type { Request, Response } from "express";
import { countryService } from "../services/countryService";
import { sendSuccess } from "@/utils";

export class CountryController {
    static getAllCountries = async (req: Request, res: Response) => {
        const customerCountries = await countryService.getAllCountries();
        return sendSuccess(res, customerCountries, 'Paises econtrados exsitosamente!');
    }
}