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

    async getProductById(id: string) {
        const product = await this.productRepository.findById(id);
        if (!product) throw ApiError.notFound('Producto No encontrado');
        return product;
    }

    async updateProductById(id: string, data: InsertProduct) {
        await this.getProductById(id);
        await this.productRepository.updateById(id, data);
    }
}

export const productService = new ProductService(productRepository);