import { Router } from "express";
import { param } from "express-validator";
import { validateRequest } from "@/middlewares";
import { SupplierController } from "../controllers/SupplierController";
import { validateSupplierInput } from "../middlewares/validateSupplierInput";

export const supplierRoute = Router();

supplierRoute.post('/',
    validateSupplierInput,
    validateRequest,
    SupplierController.createSupplier
);

supplierRoute.get('/',
    SupplierController.getSuppliers
);

supplierRoute.get('/:id',
    param('id').notEmpty().withMessage('El id es requerido'),
    validateRequest,
    SupplierController.getSupplier
);

supplierRoute.put('/:id/edit',
    param('id').notEmpty().withMessage('El id es requerido'),
    validateSupplierInput,
    validateRequest,
    SupplierController.editSupplier
);

