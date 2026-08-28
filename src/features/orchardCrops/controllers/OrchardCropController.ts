import type { Request, Response } from "express";
import { sendCreated, sendDeleted, sendSuccess } from "@/utils";
import { orchardCropService } from "../services/orchardCropService";

export class OrchardCropController {
    static create = async (req: Request, res: Response) => {
        const crop = await orchardCropService.create(req.body);
        return sendCreated(res, crop, "Producto relacionado con la huerta correctamente.");
    };

    static getAll = async (req: Request, res: Response) => {
        const crops = await orchardCropService.getAll();
        return sendSuccess(res, crops, "Relaciones huerta-producto encontradas correctamente.");
    };

    static getAllByOrchardId = async (
        req: Request<{ orchardId: string }>,
        res: Response
    ) => {
        const crops = await orchardCropService.getAllByOrchardId(req.params.orchardId);
        return sendSuccess(res, crops, "Productos de la huerta encontrados correctamente.");
    };

    static getAvailability = async (
        req: Request<{ orchardId: string }>,
        res: Response
    ) => {
        const availability = await orchardCropService.getAvailability(
            req.params.orchardId
        );
        return sendSuccess(res, availability, "Disponibilidad de la huerta encontrada correctamente.");
    };

    static getById = async (req: Request<{ id: string }>, res: Response) => {
        const crop = await orchardCropService.getById(req.params.id);
        return sendSuccess(res, crop, "Relación huerta-producto encontrada correctamente.");
    };

    static update = async (req: Request<{ id: string }>, res: Response) => {
        await orchardCropService.update(req.params.id, req.body);
        return sendSuccess(res, {}, "Relación huerta-producto actualizada correctamente.");
    };

    static delete = async (req: Request<{ id: string }>, res: Response) => {
        await orchardCropService.delete(req.params.id);
        return sendDeleted(res, "Relación huerta-producto eliminada correctamente.");
    };
}
