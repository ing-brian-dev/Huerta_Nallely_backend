import { ApiError } from "@/utils";
import { InsertSupplier } from "../types/supplier.types";
import { ISupplierRepository, supplierRepository } from "./SupplierRepository";

class SupplierService {
    constructor(
        private supplierRepository: ISupplierRepository
    ) { }

    private async validateSupplierData(data: InsertSupplier, currentSupplierId?: string) {

        const [supplierByEmail, supplierByPhone] = await Promise.all([
            this.supplierRepository.findByEmail(data.email),
            this.supplierRepository.findByPhone(data.phone),
        ]);

        // Email already belongs to other Supplier
        if (supplierByEmail && String(supplierByEmail.id) !== String(currentSupplierId)) {
            throw ApiError.conflict(`El correo ${data.email} ya está registrado.`);
        }

        // Phone already belongs to other Supplier
        if (supplierByPhone && String(supplierByPhone.id) !== String(currentSupplierId)) {
            throw ApiError.conflict(`El teléfono ${data.phone} ya está registrado.`);
        }
    }

    async createSupplier(data: InsertSupplier) {
        await this.validateSupplierData(data);
        await this.supplierRepository.create(data);
    }

    async getSupplierById(id: string) {
        const supplier = await this.supplierRepository.findById(id);

        if (!supplier) throw ApiError.notFound("Proveedor no encontrado.");

        return supplier;
    }

    async getSupplierByEmail(email: string) {
        const supplier = await this.supplierRepository.findByEmail(email);

        if (!supplier) throw ApiError.notFound("Proveedor no encontrado.");

        return supplier;
    }

    async editSupplierById(id: string, data: InsertSupplier) {
        const currentSupplier = await this.getSupplierById(id);
        const emailChanged = data.email !== currentSupplier.email;
        const phoneChanged = data.phone !== currentSupplier.phone;

        if (emailChanged || phoneChanged) {
            await this.validateSupplierData(data, id);
        }

        return await this.supplierRepository.updateById(id, data);
    }

    async getAllSuppliers() {
        return await this.supplierRepository.getAll();
    }
}

export const supplierService = new SupplierService(supplierRepository);