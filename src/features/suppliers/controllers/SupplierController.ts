import type { Request, Response } from "express"
import { supplierService } from "../services/SupplierService";
import { sendCreated, sendSuccess } from "@/utils";

export class SupplierController {

    static createSupplier = async (req: Request, res: Response) => {
        await supplierService.createSupplier(req.body);
        return sendCreated(res, {}, 'Proveedor Creado Correcamente!');
    }

    static getSupplier = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        const supplier = await supplierService.getSupplierById(id);
        return sendSuccess(res, supplier, 'Provedor encontrado exitosamente!');
    }

    static editSupplier = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        await supplierService.editSupplierById(id, req.body);
        return sendSuccess(res, {}, 'Proveedor editado correctamente!');
    }

    static getSuppliers = async (req: Request, res: Response) => {
        const suppliers = await supplierService.getAllSuppliers();
        return sendSuccess(res, suppliers, 'Proveedores encontrados exitosamente!');
    }
}