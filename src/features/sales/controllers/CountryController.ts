import type { Request, Response } from "express";
import { sendCreated, sendSuccess } from "@/utils";
import { countryService } from "../services";

export class CountryController {
    static getAllCountries = async (req: Request, res: Response) => {
        const customerCountries = await countryService.getAllCountries();
        return sendSuccess(res, customerCountries, 'Paises econtrados exsitosamente!');
    }
}

