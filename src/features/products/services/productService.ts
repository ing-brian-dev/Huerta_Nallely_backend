import { ApiError } from "@/utils";
import { InsertProduct } from "../types/product.types";
import { IProduct, productRepository } from "./productRepository";


export class ProductService {
    constructor(
        private productRepository: IProduct
    ) { }

    async createProduct(data: InsertProduct) {
        await this.productRepository.create(data);
    }

    async getAllProducts() {
        return await this.productRepository.findAll();
    }

    async getProductById(id: number) {
        const product = await this.productRepository.findById(Number(id));
        if (!product) throw ApiError.notFound('Producto No encontrado');
        return product;
    }

    async getProductSearchProductByName(text: string) {
        const products = await this.productRepository.findByName(text);

        if (!products.length) {
            throw ApiError.notFound("Productos no encontrados");
        }
        return products;
    }

    async updateProductById(id: number, data: InsertProduct) {
        await this.getProductById(id);
        await this.productRepository.updateById(Number(id), data);
    }
}

export const productService = new ProductService(productRepository);