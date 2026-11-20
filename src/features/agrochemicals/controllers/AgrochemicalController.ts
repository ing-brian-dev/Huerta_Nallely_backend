import type { Request, Response } from "express";
import { agrochemicalService } from "../services/agrochemicalService";
import { sendCreated, sendSuccess } from "@/utils";

export class AgrochemicalController {

    static getAllAgrochemicals = async (req: Request, res: Response) => {
        const agrochemicals = await agrochemicalService.getAllAgrochemicals();
        return sendSuccess(res, agrochemicals, 'Agroquimicos obtenidos con exito.')
    }

    static createAgrochemical = async (req: Request, res: Response) => {
        await agrochemicalService.createAgrochemical(req.body);
        return sendCreated(res, {}, 'Agroquimico creado con exito.');
    }

    static findAgrochemicalById = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        const agrochemical = await agrochemicalService.findAgrochemicalById(Number(id));
        return sendSuccess(res, agrochemical, 'Agroquimico obtenido con exito.');
    }


    //Categories

    static getAllAgrochemicalCategories = async (req: Request, res: Response) => {
        const agrochemicalCategories = await agrochemicalService.getAllAgrochemicalCategories();
        return sendSuccess(res, agrochemicalCategories, 'Categorias obtenidas con exito.');
    }

    static createAgrochemicalCategory = async (req: Request, res: Response) => {
        await agrochemicalService.createAgrochemicalCategory(req.body);
        return sendCreated(res, {}, 'Categoria de Agroquimico creada con exito.');
    }

    static findAgrochemicalCategory = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        const category = await agrochemicalService.findAgrochemicalCategory(Number(id));
        return sendSuccess(res,category,'Categoria de Agroquimico obtenida con exito.');
    }

}