import type { Request, Response } from "express"
import { orchardService } from "../services/orchardService"
import { sendCreated, sendSuccess } from "@/utils";

export class OrchardController {

    static createOrchard = async (req: Request, res: Response) => {
        await orchardService.createOrchard(req.body);
        return sendCreated(res, {}, 'Huerta Creada correctamente!');
    }

    static updateOrchard = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        await orchardService.updateOrchardById(Number(id), req.body);
        return sendSuccess(res, {}, 'Huerta actualizada correctamente!');
    }

    static getAllOrchards = async (req: Request, res: Response) => {
        const orchards = await orchardService.getAllOrchards();
        return sendSuccess(res, orchards, 'Huertas encontradas correctamente!');
    }

    static getOrchard = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        const orchard = await orchardService.getOrchardById(Number(id));
        return sendSuccess(res, orchard, 'Huerta encontrada correctamente!');
    }

}