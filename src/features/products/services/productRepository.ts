import { Product } from "@/db/schemas";
import { InsertProduct, SelectProduct } from "../types/product.types";

export interface IProduct {
    create(data: InsertProduct): Promise<void>;
    findAll(): Promise<SelectProduct[]>;
    findById(id: string): Promise<SelectProduct>;
    updateById(id: string, data: InsertProduct): Promise<void>;
}

export class ProductRepository implements IProduct {
    async create(data: InsertProduct) {
        await Product.create(data);
    }

    async findAll() {
        return await Product.findAll();
    }

    async findById(id: string) {
        return await Product.findOne({ where: { id } });
    }

    async updateById(id: string, data: InsertProduct) {
        await Product.update(data, { where: { id } });
    }

}

export const productRepository = new ProductRepository();