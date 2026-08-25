import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { validateProductInput } from "../middlewares/validateProductInput";
import { validateRequest } from "@/middlewares";
import { param } from "express-validator";

export const productRoute = Router();

productRoute.post('/',
    validateProductInput,
    validateRequest,
    ProductController.createProduc
);

productRoute.get('/',
    ProductController.getAllProducts
);

productRoute.get('/:id',
    param('id').notEmpty().withMessage('El id es requerido.'),
    validateRequest,
    ProductController.getProductById
);

productRoute.put('/:id',
    param('id').notEmpty().withMessage('El id es requerido.'),
    validateProductInput,
    validateRequest,
    ProductController.updateProductById
);