import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validateCustomerInput = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre del cliente es requerido.")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede superar los 100 caracteres.")
        .run(req);

    await body("phone")
        .trim()
        .notEmpty()
        .withMessage("El teléfono del cliente es requerido.")
        .isLength({ max: 20 })
        .withMessage("El teléfono no puede superar los 20 caracteres.")
        .run(req);

    await body("address")
        .optional({ values: "null" })
        .trim()
        .isLength({ max: 200 })
        .withMessage("La dirección no puede superar los 200 caracteres.")
        .run(req);

    await body("email")
        .optional({ values: "null" })
        .trim()
        .isEmail()
        .withMessage("El correo electrónico no es válido.")
        .isLength({ max: 100 })
        .withMessage("El correo electrónico no puede superar los 100 caracteres.")
        .run(req);

    await body("country_id")
        .notEmpty()
        .withMessage("El país es requerido.")
        .isInt({ min: 1 })
        .withMessage("El país seleccionado no es válido.")
        .toInt()
        .run(req);

    await body("customer_type_id")
        .notEmpty()
        .withMessage("Debes seleccionar al menos un tipo de cliente.")
        .run(req);
    next();
}