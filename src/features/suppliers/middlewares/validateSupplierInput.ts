import type { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateSupplierInput = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await body('name')
        .notEmpty().withMessage('El nombre es requerido.').run(req);
    await body('contact_name')
        .notEmpty().withMessage('El nombre del contacto es requerido.').run(req);
    await body('phone')
        .notEmpty().withMessage('El celular es requerido.').run(req);
    await body('address')
        .notEmpty().withMessage('La direccion es requerida.').run(req);
    await body('email')
        .notEmpty().withMessage('El correo es requerido.').run(req);
    await body('isActive')
        .optional()
        .isBoolean().withMessage('Esta activo debe ser boolean').run(req);
    next();
};