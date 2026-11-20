import { Router } from "express";
import { AgrochemicalController } from "../controllers/AgrochemicalController";
import { validateAgrochemicalInput } from "../middlewares/validateAgrochemicalInput";
import { validateRequest } from "@/middlewares";
import { validateAgrochemicalCategoryInput } from "../middlewares/validateAgrochemicalCategoryInput";
import { param } from "express-validator";

export const agrochemicalRoute = Router();

const validateId = param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo.");

agrochemicalRoute.get('/',
    AgrochemicalController.getAllAgrochemicals
)

agrochemicalRoute.post('/',
    validateAgrochemicalInput,
    validateRequest,
    AgrochemicalController.createAgrochemical
);

agrochemicalRoute.get('/:id',
    validateId,
    validateRequest,
    AgrochemicalController.findAgrochemicalById
);

//Categories
agrochemicalRoute.post('/categories',
    validateAgrochemicalCategoryInput,
    validateRequest,
    AgrochemicalController.createAgrochemicalCategory
);

agrochemicalRoute.get('/categories/',
    AgrochemicalController.getAllAgrochemicalCategories
);

agrochemicalRoute.get('/categories/:id',
    validateId,
    validateRequest,
    AgrochemicalController.findAgrochemicalCategory
);