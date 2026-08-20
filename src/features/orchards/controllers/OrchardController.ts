import type { Request, Response } from "express"
import { orchardService } from "../services/orchardService"
import { sendCreated } from "@/utils";

export class OrchardController {

    static createOrchard = async (req: Request, res: Response) => {
        await orchardService.createOrchard(req.body);
        return sendCreated(res,{},'Huerta Creada correctamente.');
    }

}