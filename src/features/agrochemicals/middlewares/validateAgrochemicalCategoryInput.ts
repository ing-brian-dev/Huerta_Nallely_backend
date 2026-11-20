import type { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

export const validateAgrochemicalCategoryInput = async (req: Request, response: Response, next: NextFunction) => {
    await body("name")
        .trim()
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isLength({ max: 100 })
        .withMessage("El nombre no puede exceder los 100 caracteres").run(req);

    await body('description')
        .optional()
        .trim()
        .isLength({ max: 250 }).withMessage("La descripción debe tener máximo 250 caracteres").run(req);
    next();
}

