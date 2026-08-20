import { countryRepository, ICountryRepository } from "@/features/countries/services/countryRepository";
import { customerRepository, ICustomerRepository } from "./customerRepository";
import { InsertCustomer } from "../types/customer.types";
import { ApiError } from "@/utils";

class CustomerService {
    constructor(
        private customerRepository: ICustomerRepository,
        private countryRepository: ICountryRepository,
    ) { }

    async createCustomer(data: InsertCustomer) {
        await this.validateCustomerRelations(data);
        await this.customerRepository.create(data);
    }

    async updateCustomerById(id: string, data: InsertCustomer) {
        await this.validateCustomerRelations(data);
        return await this.customerRepository.updateById(id, data);
    }

    private async validateCustomerRelations(data: InsertCustomer) {

        const customerType = await this.customerRepository.findTypeById(data.customer_type_id);
        if (!customerType) throw ApiError.notFound("El tipo de cliente no encontrado.");

        const country = await this.countryRepository.findById(data.country_id);
        if (!country) throw ApiError.notFound("País no encontrado.");
    }

    async getCustomerById(id: string) {
        const customer = await this.customerRepository.findById(id);
        if (!customer) throw ApiError.notFound("Cliente no encontrado.");
        return customer;
    }

    async getAllCustomers() {
        return await this.customerRepository.getAll();
    }

    // Customer Types

    async getAllCustomerTypes() {
        return await this.customerRepository.getAllCustomerTypes();
    }

}

export const customerService =
    new CustomerService(
        customerRepository,
        countryRepository
    );