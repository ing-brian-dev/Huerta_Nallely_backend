import type { Request, Response } from "express"
import { productService } from "../services/productService"
import { sendCreated, sendNoContent, sendSuccess } from "@/utils";

export class ProductController {
    static createProduc = async (req: Request, res: Response) => {
        await productService.createProduct(req.body);
        return sendCreated(res, {}, 'Producto Creado Correctamente');
    }

    static getAllProducts = async (req: Request, res: Response) => {
        const products = await productService.getAllProducts();
        return sendSuccess(res, products, 'Productos encontrados correctamente!');
    }

    static getProductById = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        const product = await productService.getProductById(id);
        return sendSuccess(res, product, 'Producto Encontrado correctamente!');
    }

    static getProductByName = async (req: Request<{ name: string }>, res: Response) => {
        const { name } = req.params;
        const product = await productService.getProductSearchProductByName(name);
        return sendSuccess(res, product, 'Productos encontrados correctamente');
    }

    static updateProductById = async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        await productService.updateProductById(id, req.body);
        return sendSuccess(res, {}, 'Producto Editado Correctamente!');
    }
}