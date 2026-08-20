import { Request, Response, NextFunction } from "express"
import { body } from "express-validator"

export const validateOrchardInput = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre de la huerta es obligatorio.")
        .isLength({ max: 100 })
        .withMessage("El nombre de la huerta no puede superar los 100 caracteres.").run(req);

    await body("municipality")
        .trim()
        .notEmpty()
        .withMessage("El municipio es obligatorio.")
        .isLength({ max: 250 })
        .withMessage("El municipio no puede superar los 250 caracteres.")
        .run(req);

    await body("state")
        .trim()
        .notEmpty()
        .withMessage("El estado es obligatorio.")
        .isLength({ max: 100 })
        .withMessage("El estado no puede superar los 100 caracteres.")
        .run(req);

    await body("hectares")
        .notEmpty()
        .withMessage("La cantidad de hectáreas es obligatoria.")
        .isFloat({ min: 0.01 })
        .withMessage("Las hectáreas deben ser un número mayor a 0.")
        .toFloat().run(req);

    await body("registration_date")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("La fecha de registro no tiene un formato válido.")
        .toDate()
        .run(req);

    await body("isActive")
        .optional()
        .isBoolean()
        .withMessage("El estado activo debe ser verdadero o falso.")
        .toBoolean().run(req);

    await body("orchard_note")
        .optional({ nullable: true })
        .trim()
        .isLength({ max: 250 })
        .withMessage("La nota de la huerta no puede superar los 250 caracteres.").run(req);

    next();
}