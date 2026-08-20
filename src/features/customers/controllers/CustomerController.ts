import type { Request, Response } from "express";
import { sendCreated, sendSuccess } from "@/utils";
import { customerService } from "../services/customerService";

export class CustomerController {

    static createCustomer = async (req: Request, res: Response) => {
        await customerService.createCustomer(req.body);
        return sendCreated(res, {}, 'Cliente Creado Correcamente!');
    }

    static getCustomerById = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        const customer = await customerService.getCustomerById(id);
        return sendSuccess(res, customer, 'Cliente encontrado exitosamente!');
    }

    static updateCustomerById = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        await customerService.updateCustomerById(id, req.body);
        return sendSuccess(res, {}, 'Cliente actualizado exitosamente!');
    }

    static getCustomers = async (req: Request, res: Response) => {
        const customers = await customerService.getAllCustomers();
        return sendSuccess(res, customers, 'Clientes encontrados exitosamente!');
    }

    //Customer Types
    static getAllCustomerTypes = async (req: Request, res: Response) => {
        const customerTypes = await customerService.getAllCustomerTypes();
        return sendSuccess(res, customerTypes, 'Tipos de clientes econtrados exitosamente!');
    }
}