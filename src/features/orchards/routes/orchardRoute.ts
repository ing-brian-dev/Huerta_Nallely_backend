import { Router } from "express";
import { OrchardController } from "../controllers/OrchardController";
import { validateRequest } from "@/middlewares";
import { validateOrchardInput } from "../middlewares/validateOrchardInput";

export const orchardRoute = Router();

orchardRoute.post('/',
    validateOrchardInput,
    validateRequest,
    OrchardController.createOrchard
)
