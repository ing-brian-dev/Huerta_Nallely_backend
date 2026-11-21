import type { Request, Response, NextFunction } from "express"
import { body } from "express-validator";

export const validateProductInput = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await body("name")
        .exists({ checkFalsy: true }).withMessage("El nombre es obligatorio")
        .bail()
        .isString().withMessage("El nombre debe ser un texto")
        .bail()
        .trim()
        .isLength({ min: 1, max: 100 }).withMessage("El nombre debe tener máximo 100 caracteres")
        .run(req);

    await body("description")
        .optional({ nullable: true })
        .isString().withMessage("La descripción debe ser un texto")
        .bail()
        .trim()
        .isLength({ max: 250 }).withMessage("La descripción debe tener máximo 250 caracteres")
        .run(req);

    await body("is_active")
        .optional()
        .isBoolean().withMessage("is_active debe ser un valor booleano")
        .toBoolean()
        .run(req);

    next();
}