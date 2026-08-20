import { Router } from "express";
import { validateRequest } from "@/middlewares";
import { param } from "express-validator";
import { CustomerController } from "../controllers/CustomerController";
import { validateCustomerInput } from "../middlewares/validateCustomerInput";

export const customerRoute = Router();

customerRoute.post('/',
    validateCustomerInput,
    validateRequest,
    CustomerController.createCustomer
);

customerRoute.get('/:id',
    param('id').notEmpty().withMessage('El id es requerido'),
    validateRequest,
    CustomerController.getCustomerById
);

customerRoute.put('/:id',
    param('id').notEmpty().withMessage('El id es requerido'),
    validateCustomerInput,
    validateRequest,
    CustomerController.updateCustomerById
);

customerRoute.get('/',
    CustomerController.getCustomers
);

