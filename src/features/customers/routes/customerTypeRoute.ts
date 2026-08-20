import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController";

export const customerTypeRoute = Router();

customerTypeRoute.get('/',
    CustomerController.getAllCustomerTypes
)