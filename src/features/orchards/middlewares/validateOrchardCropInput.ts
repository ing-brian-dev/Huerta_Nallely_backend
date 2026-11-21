import type { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateOrchardCropInput = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    await body("hectares")
        .exists({ checkFalsy: true })
        .withMessage("Las hectáreas son obligatorias.")
        .bail()
        .isFloat({ min: 0.01 })
        .withMessage("Las hectáreas deben ser un número mayor a 0.")
        .toFloat()
        .run(req);

    await body("planting_date")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("La fecha de plantación no tiene un formato válido.")
        .run(req);

    await body("is_active")
        .optional()
        .isBoolean()
        .withMessage("is_active debe ser verdadero o falso.")
        .toBoolean()
        .run(req);

    await body("notes")
        .optional({ nullable: true })
        .isString()
        .withMessage("Las notas deben ser texto.")
        .trim()
        .isLength({ max: 250 })
        .withMessage("Las notas no pueden superar los 250 caracteres.")
        .run(req);

    await body("orchard_id")
        .exists({ checkFalsy: true })
        .withMessage("La huerta es obligatoria.")
        .bail()
        .isInt({ min: 1 })
        .withMessage("La huerta seleccionada no es válida.")
        .toInt()
        .run(req);

    await body("product_id")
        .exists({ checkFalsy: true })
        .withMessage("El producto es obligatorio.")
        .bail()
        .isInt({ min: 1 })
        .withMessage("El producto seleccionado no es válido.")
        .toInt()
        .run(req);

    next();
};
