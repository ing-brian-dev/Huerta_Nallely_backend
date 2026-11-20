import { Router } from "express";
import { AgrochemicalController } from "../controllers/AgrochemicalController";
import { validateRequest } from "@/middlewares";
import { validateAgrochemicalCategoryInput } from "../middlewares/validateAgrochemicalCategoryInput";
import { param } from "express-validator";

export const agrochemicalCategoryRoute = Router();

const validateId = param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo.");

//Categories
agrochemicalCategoryRoute.post('/',
    validateAgrochemicalCategoryInput,
    validateRequest,
    AgrochemicalController.createAgrochemicalCategory
);

agrochemicalCategoryRoute.get('/',
    AgrochemicalController.getAllAgrochemicalCategories
);

agrochemicalCategoryRoute.get('/:id',
    validateId,
    validateRequest,
    AgrochemicalController.findAgrochemicalCategory
);