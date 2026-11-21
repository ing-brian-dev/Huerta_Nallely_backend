import { Op } from "sequelize";
import { Product } from "@/db/schemas";
import { InsertProduct, SelectProduct } from "../types";

export interface IProductRepository {
    create(data: InsertProduct): Promise<void>;
    findAll(): Promise<SelectProduct[]>;
    findById(id: number): Promise<SelectProduct>;
    findByName(text: string): Promise<SelectProduct[]>;
    updateById(id: number, data: InsertProduct): Promise<void>;
}

export class ProductRepository implements IProductRepository {
    async create(data: InsertProduct) {
        await Product.create(data);
    }

    async findAll() {
        return await Product.findAll();
    }

    async findById(id: number) {
        return await Product.findOne({ where: { id } });
    }

    async findByName(text: string) {
        return await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${text}%`,
                },
            },
            limit: 10,
        });
    }

    async updateById(id: number, data: InsertProduct) {
        await Product.update(data, { where: { id } });
    }

}

export const productRepository = new ProductRepository();