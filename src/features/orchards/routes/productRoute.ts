import { Router } from "express";
import { validateRequest } from "@/middlewares";
import { param } from "express-validator";
import { validateProductInput } from "../middlewares";
import { ProductController } from "../controllers";

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

productRoute.get('/:name/search',
    param('name').notEmpty().withMessage('El id es requerido.'),
    validateRequest,
    ProductController.getProductByName
);

productRoute.put('/:id',
    param('id').notEmpty().withMessage('El id es requerido.'),
    validateProductInput,
    validateRequest,
    ProductController.updateProductById
);