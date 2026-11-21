import { Router } from "express";
import { validateRequest } from "@/middlewares";
import { param } from "express-validator";
import { validateOrchardInput } from "../middlewares";
import { OrchardController } from "../controllers";

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
