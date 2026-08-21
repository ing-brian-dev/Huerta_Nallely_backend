import { Router } from "express";
import { OrchardController } from "../controllers/OrchardController";
import { validateRequest } from "@/middlewares";
import { validateOrchardInput } from "../middlewares/validateOrchardInput";
import { param } from "express-validator";

export const orchardRoute = Router();

orchardRoute.post('/',
    validateOrchardInput,
    validateRequest,
    OrchardController.createOrchard
);

orchardRoute.get('/',
    OrchardController.getAllOrchards
);

orchardRoute.get('/:id',
    param('id')
        .notEmpty().withMessage('El id es requerido.')
        .isInt().withMessage('El id debe ser numerico'),
    validateRequest,
    OrchardController.getOrchard
);

orchardRoute.put('/:id',
    param('id')
        .notEmpty().withMessage('El id es requerido.')
        .isInt().withMessage('El id debe ser numerico'),
    validateOrchardInput,
    validateRequest,
    OrchardController.updateOrchard
)
