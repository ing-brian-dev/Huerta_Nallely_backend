import type { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateAgrochemicalInput = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre es requerido")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede exceder los 100 caracteres").run(req);

    await body("category_id")
        .notEmpty()
        .withMessage("La categoria es requerida")
        .isInt({ min: 1 })
        .withMessage("La categoria debe de ser un numero entero").run(req)

    await body("unit_of_measurement_id")
        .notEmpty()
        .withMessage("La unidad de medida es requerida")
        .isInt({ min: 1 })
        .withMessage("La unidad de medida debe de ser un numero entero").run(req)

    await body("is_active")
        .optional()
        .isBoolean()
        .withMessage("La unidad de medida debe de ser un valor booleano").run(req)

    next();
}