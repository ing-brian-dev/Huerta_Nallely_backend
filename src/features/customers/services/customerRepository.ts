import { Country, Customer, CustomerType } from "@/db/schemas";
import { InsertCustomer, SelectCustomer, SelectCustomerType } from "../types/customer.types";

export interface ICustomerRepository {
    create(data: InsertCustomer): Promise<void>;
    findTypeById(id: number): Promise<SelectCustomerType | null>;
    findById(id: string): Promise<Customer | null>;
    findByPhone(phone: string): Promise<Customer | null>;
    updateById(id: string, data: InsertCustomer): Promise<void>;
    getAll(): Promise<SelectCustomer[]>;

    getAllCustomerTypes(): Promise<SelectCustomerType[]>;
}

class CustomerRepository implements ICustomerRepository {

    async create(data: InsertCustomer) {
        await Customer.create(data);
    }

    async updateById(id: string, data: InsertCustomer) {
        await Customer.update(data, { where: { id } });
    }

    async findById(id: string) {
        return await Customer.findByPk(id);
    }

    async findByPhone(phone: string) {
        return await Customer.findOne({ where: { phone } });
    }

    async findTypeById(id: number) {
        return await CustomerType.findOne({ where: { id } });
    }


    async getAll(): Promise<SelectCustomer[]> {
        return await Customer.findAll({
            include: [
                {
                    model: Country,
                    attributes: ["name", "isoCode"],
                },
                {
                    model: CustomerType,
                    attributes: ["name", "description"],
                },
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }

    //Customer types

    async getAllCustomerTypes() {
        return await CustomerType.findAll({ attributes: ['id', 'name', 'description'] });
    }
}

export const customerRepository = new CustomerRepository();