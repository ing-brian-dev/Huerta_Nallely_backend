import { Router } from "express";
import { CustomerController } from "../controllers";

export const customerTypeRoute = Router();

customerTypeRoute.get('/',
    CustomerController.getAllCustomerTypes
)